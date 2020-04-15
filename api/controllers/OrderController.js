const Pubsub = require('@google-cloud/pubsub');
const Postmates = require('postmates');
let postmates = new Postmates(
  'cus_LoItS9bvreQaSV',
  '89be15de-1220-4905-b0f0-cd3c4306ecc3'
);
let deliveryMode;
let estimatedSelectedTime;
module.exports = {

  /**
   * converts the users current cart to an order only when all criteria are met
   * @param {req} req
   * @param {res} res
   * @GET cardNumber
   * @GET cardExpires
   * @GET cardCsc
   * @GET billingName
   * @GET billingAddress
   * @GET billingCity
   * @GET billingZipcode
   * @GET billingCountry
   * @GET deliveryAddress
   * @GET deliveryCity
   * @GET deliveryZipcode
   * @GET deliveryState
   * @GET deliveryTime
   * @GET note
   * @GET userId
   * @GET deliveryApt
   * @GET deliveryState
   * @GET billingState
   * @GET deliveryCountry
   * @GET deliveryName
   * @GET billingApartment
   * @GET deliveryMethod
   * @GET deliveryQuoteId
   * @returns {Object}
   */
  createOrder: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowOrderPlace');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    if (!req.param('user_id') ||
      !req.param('cart_id') ||
      !req.param('card_number') ||
      !req.param('expiration') ||
      !req.param('csv') ||
      !req.param('billing_name') ||
      !req.param('billing_address') ||
      !req.param('billing_city') ||
      !req.param('billing_zipcode') ||
      !req.param('billing_country') ||
      !req.param('delivery_address') ||
      !req.param('delivery_city') ||
      !req.param('delivery_zipcode') ||
      !req.param('delivery_apt') ||
      !req.param('delivery_state') ||
      !req.param('billing_state') ||
      !req.param('delivery_country') ||
      !req.param('delivery_name') ||
      !req.param('billing_apartment') ||
      !req.param('delivery_method') ||
      !req.param('delivery_quoteId') ||
      !req.param('delivery_time')
    ) {
      res.sendStatus(500);
      await sails.helpers.logger('error', 'Create order missing some parameters');
      return;
    }
    const params = req.allParams();
    const userId = User.decryptUserKey(params.user_id);
    deliveryMode = params.delivery_method;
    const deliveryTime = params.delivery_time;
    let datetime = new Date();
    let time = `${deliveryTime}:00`;
    datetime = `${datetime.getFullYear()}-${datetime.getMonth() + 1}-${datetime.getDate()} ${time}`;
    estimatedSelectedTime = new Date(datetime).toISOString();
    // TODO: currently pulling this out of cartitem, but it needs to come out
    // inventory
    const cartData = await Inventory.getReserveInventoryByCart(params.cart_id, req.key);
    const total = module.exports.calculateTotal(cartData);
    if (total === null) {
      await sails.helpers.logger('error', 'error calculating total');
      res.status(500).send('error calculating total');
      return;
    }
    params.order_total = total;
    params.user_id = userId;
    const validatedParams = await sails.helpers.validateCreationParams(Order,
        params);
    validatedParams.api_key = req.key;
    const newOrder = await Order.create(validatedParams).fetch();

    // TODO(Matt): The following is a hack because @see_line 61, so we are
    // going to disassociate the cart with the user!
    await Cart.update({where: {'user_id': userId, 'api_key' : req.key}})
        .set({'user_id': -1});
    const packPayload = {};
    packPayload.orderId = newOrder.id;
    packPayload.cartId = params.cart_id;
    packPayload.api_key = req.key;
    packPayload.delivery = params;
    await module.exports.temporaryHackToCreateInventoryForCartItems(
      cartData, params.cart_id, req.key); // Temporary HACK
    await module.exports.packOrder(packPayload, res, true);

    // Note: When you place an order, we set the reservation to be
    // super far in the future (50 years). its essentially reserved for all
    // time When we pack, we will not pack an item that has an expired
    // reservation so take caution whilst creating an order.
  },

  /**
   * 12/6/18: We don't have any inventory, so how do we checkout, when checkout
   * requires items be in inventory and reserved? ... We create the inventory
   * at the time of order placement.
   * @param {Array} cartData
   * @param {Number} cartId
   * @param {String} apiKey
   * @returns {Boolean|Void}
   */
  async temporaryHackToCreateInventoryForCartItems(cartData, cartId, apiKey) {
    if (!cartId || !cartData || !cartData.length) {
      return false;
    }
    await Inventory.update({where: {'reservation_cart_id': cartId, 'api_key' : apiKey}}).set(
        {'reservation_expires': 2785993200000, 'is_reserved': 2});
  },

  /**
   * This code is pretty much a ported clone of the logic used on the client
   * @param {Tuple3} listOfItems<tuple3(price, sale_price, quantity)>
   * @returns {Number} return total number of item amount
   */
  calculateTotal(listOfItems) {
    let total = 0;
    let subTotal = 0;
    let shipping = 0;
    listOfItems.forEach(item => {
      let sub = 0;
      let ship = 0;
      sub += Number(!!item.sale_price ? item.sale_price : item.price) *
          Number(item.quantity);
      ship += Number(item.quantity);
      subTotal = Number((sub).toFixed(2));
      shipping = Number((ship).toFixed(2));
      total = Number((Number(subTotal) + Number(shipping)).toFixed(2));
    });
    return total;
  },

  /**
   *
   * @param {req} req
   * @param {res} res
   * @returns {Object}
   */
  packOrderEndpoint: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowOrderPlace');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    await module.exports.packOrder(req.allParams(), res);
  },

  /**
   * @param {Object} params
   * @param {res} res
   * @param {Boolean} resRequired
   * @GET orderId
   */
  packOrder: async function(params, res, resRequired = true) {
    const pubsub = new Pubsub({
      keyFilename: './config/google-api-key.json',
      projectId: 'fulfil-web'
    });
    const orderId = params.orderId;
    if (!orderId) {
      res.sendStatus(500);
      return;
    }
    const order = await Order.find({id: orderId, api_key : params.api_key});
    if (!order.length) {
      res.sendStatus(500);
      await sails.helpers.logger('error', 'specified order was not found');
      return;
    }
    const topic = sails.config.environment === 'development' ? 'PACK-DEV' : sails.config.custom.inductionPubSubTopic;
    const packet = {
      "to": "factory0.factory_control",
      "from": "api0",
      "status": "created",
      "type": "new_order_placed",
      "body": {
        "order_id": orderId,
        "choose_your_own_items": [],
        "normal_items": [],
        "requested_delivery_time": estimatedSelectedTime,
        "is_customer_pickup": false
      }
    };

    const orders = await Order.packOrderbyId(
        params.cartId,
        new Date().getTime(),
        params.api_key
    );
    orders.forEach(item => {
      packet.body.choose_your_own_items.push(item.inventory_id);
      packet.body.normal_items.push({
        "product_id": item.product_id,
        "grade_id": item.grade_id
      });
    });
    // convert to a buffer
    if (process.env.NODE_ENV !== 'test') {

      /*
         pickup address is fixed for now because we need to specify
         warehouse address here
       */
      const deliveryQuoteParams = {
        pickup_address : '901 shasta st, Redwood City, CA',
        dropoff_address : `${params.delivery.delivery_address},${params.delivery.delivery_city},${params.delivery.delivery_state}`
      };
      if (params.delivery.delivery_quoteId === undefined || params.delivery.delivery_quoteId === ''
        || params.delivery.delivery_quoteId === null) {
        await sails.helpers.logger('error', 'Postmates - Failed to create quote');
      }
      const items = await Order.getOrderDetailForDelivery(
        params.cartId,
        params.api_key
      );

      const manifest_items = [];
      items.forEach(({ product_name, qty }) => {
        manifest_items.push({
          name : product_name,
          quantity : qty,
          size : items.length === 1 ? 'small' : 'medium'
        })
      });
      const deliveryParams = {
        ...deliveryQuoteParams,
        manifest: "A customers order (bag)",
        pickup_name: "Fulfil Warehouse",
        pickup_phone_number : '6092357497',
        pickup_business_name: "Fulfil Inc.",
        pickup_notes: "Knock on our warehouse front door, tell them you are here to pickup order #" +
          "" + orderId + ". Feel free to double park in our parking lot",
        dropoff_name: "Matt",
        dropoff_deadline_dt: estimatedSelectedTime,
        dropoff_notes: params.delivery.note,
        dropoff_phone_number : '4089406288',
        quote_id: params.delivery.delivery_quoteId,
        manifest_items
      };

      const deliveryResponse = await module.exports.addDelivery(deliveryParams);

      const dataBuffer = Buffer.from(JSON.stringify(packet));

      if (Object.keys(deliveryResponse).length > 0) {

        packet.delivery = {};
        packet.delivery.pickup = deliveryResponse.pickup;
        packet.delivery.dropoff = deliveryResponse.dropoff;
        packet.delivery.manifest = deliveryResponse.manifest;
        packet.delivery.pickup_ready = deliveryResponse.pickup_ready;
        packet.delivery.pickup_deadline = deliveryResponse.pickup_deadline;
        packet.delivery.dropoff_ready = deliveryResponse.dropoff_ready;
        packet.delivery.dropoff_deadline = deliveryResponse.dropoff_deadline;
        packet.delivery.pickup_eta = deliveryResponse.pickup_eta;
        packet.delivery.dropoff_eta = deliveryResponse.dropoff_eta;
        packet.delivery.dropoff_identifier = deliveryResponse.dropoff_identifier;
        packet.delivery.courier = deliveryResponse.courier;
        packet.delivery.status = deliveryResponse.status;
        packet.msg = 'Order Placed Successfully';

        await EnduserDelivery.create({
          delivery_id : deliveryResponse.id,
          order_id: orderId,
          expected_delivery_date : new Date(packet.delivery.dropoff_eta).getTime(),
          delivery_status : deliveryResponse.status,
          api_key : params.api_key
        });
        
        pubsub
          .topic(topic)
          .publisher()
          .publish(dataBuffer)
          .then(msg => {
            console.log(`Message ${msg} published to topic PACK.`);
          })
          .catch(err => {
            console.error('ERROR:', err);
          });
      } else {
        await sails.helpers.logger('error', `Postmates - Failed to fetch delivery location ` +
          `{order: ${orderId}, Name: ${params.delivery.delivery_name}, Address: ` +
          `${params.delivery.delivery_address}, ${params.delivery.delivery_apt}, ` +
          `${params.delivery.delivery_city}, ${params.delivery.delivery_state}, ` +
          `${params.delivery.delivery_country}-${params.delivery.delivery_zipcode}}`);
        packet.msg = 'Ooops!!! Failed to place an order for your location';
        await Order.destroy({id: orderId});
      }
    }
    if (resRequired) {
      res.json(packet);
    }
  },

  /**
   *
   * @param {Req} req
   * @param {Res} res
   * @param {String} user_token
   * @returns {Object}
   */
  getOrdersByUserToken: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowGetOrderByUser');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    const userKey = req.param('user_token');
    const id = User.decryptUserKey(userKey);
    if (!id) {
      res.status(500);
      await sails.helpers.logger('error', 'invalid user token specified');
      return;
    }
    const orders = await Order.getOrdersByUser(id, req.key);
    res.json(orders);
  },

  /**
   *
   * @param {Req} req
   * @param {Res} res
   */
  getAllOrders:async function(req, res) {
    const orders = await Order.getAllOrders(req.query);
    res.json(orders);
  },

  /**
   * Generate dummy orders based on criteria for testing
   * @param {Req} req
   * @param {Res} res
   * @returns {Object}
   */
  generateDemoOrders: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(
       req,
       'allowGenerateDemoOrder'
    );
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    if (!req.param('min_items_per_order')) {
      return res.sendStatus(500);
    }

    if (!req.param('max_items_per_order')) {
      return res.sendStatus(500);
    }

    if (!req.param('num_orders')) {
      return res.sendStatus(500);
    }

    const key = req.key;

    let SQL = 'select i.id,i.product_id,p.category_id,i.carrier from ' +
       'inventory i join product p  on i.product_id = p.id ' +
       'where p.category_id is not null and i.is_reserved = false' +
       ' and i.api_key = $1';

    if (req.param('carrier')) {
      SQL += ` and i.carrier in (${ req.param('carrier') })`;
    }

    if (req.param('category')) {
      SQL += `and p.category_id in ( ${ req.param('category') }) `;
    }

    if (req.param('bay')) {
      SQL += `and i.bay in ( ${ req.param('bay') }) `;
    }

    const orders = await sails.sendNativeQuery(SQL, [key]);

    const orderLength = parseInt(req.param('num_orders'));
    const order = [];
    const min = parseInt(req.param('min_items_per_order'));
    const max = parseInt(req.param('max_items_per_order'));

    /**
      * Get dummy order data
      * @param {Number} fromIndex start position of order
      * @param {Number} toIndex end position of order
      * @returns {Array} dummy item order array
      */
    const getItem = (fromIndex, toIndex) => {
      const items = [];
      for(let i = fromIndex; i < toIndex; i++) {
        if (orders.rows[i]) {
          items.push(orders.rows[i]);
        }
      }
      return items;
    };

    let recStart = 0;
    let recEnd = 0;
    const userId = 1;
    for(let i = 0; i < orderLength; i++) {

      const totalItem = parseInt(Math.random() * (max - min) + min);

      if (i === 0) {
        recStart = 0;
        recEnd = totalItem;
      } else {
        recStart = recEnd + 1;
        recEnd = recStart + totalItem;
      }

      const items = getItem(recStart, recEnd);

      // create cart
      await Cart.addToCartByUser(userId, key);

      const cartData = await Cart.getCartByUser(userId, key);

      const cartId = cartData[0].id;

      order.push({
        order : i,
        cartId,
        items
      });

      // reset cart for to use for other order pack
      await Cart.update({where: {'user_id': userId, 'api_key' : key}})
         .set({'user_id': -1});

      items.forEach(async (item) => {

        const productId = item.product_id;

        // reserved inventory
        await Inventory.find({
          where: {
            'product_id': productId,
            'is_reserved': 0,
            'api_key' : key
          },
          limit: 1
        }).then(async available => {
          if (available.length) {
            const expires = new Date().setHours(new Date().getHours() + 1);

            await Inventory.reserveInventory(
               available[0].id,
               expires,
               cartId,
               key
            );

            // add to cart item
            const insertData = {};
            insertData['product_id'] = productId;
            insertData['cart_id'] = cartId;
            insertData['quantity'] = 1;
            insertData['is_virtual'] = false;
            insertData['api_key'] = key;
            await CartItem.create(insertData);

          }
        });

      });

      // update cart and inventory and send pubsub event
      const cartDataRes = await Inventory.getReserveInventoryByCart(cartId, key);

      const total = module.exports.calculateTotal(cartDataRes);
      if (total === null) {
        await sails.helpers.logger('error', 'error calculating total');
        res.status(500).send('error calculating total');
        return;
      }

      const params = {
        cart_id : cartId,
        card_number : '4111474741114747',
        csv : '333',
        expiration : '11/2019',
        billing_name : 'John Smith',
        billing_address : '3501 Edison Way',
        billing_city : 'Menlo Park',
        billing_zipcode : '94025',
        billing_country : 'USA',
        delivery_address : '3501 Edison Way',
        delivery_city : 'Menlo Park',
        delivery_state : 'CA',
        delivery_zipcode : '94025',
        delivery_time : 'ASAP',
        order_total : total,
        user_id : userId,
        api_key : key
      };

      const newOrder = await Order.create(params).fetch();

      const packPayload = {};
      packPayload.orderId = newOrder.id;
      packPayload.cartId = params.cart_id;
      packPayload.userId = userId;
      packPayload.api_key = key;
      await module.exports.temporaryHackToCreateInventoryForCartItems(
         cartDataRes,
         cartId,
         key
      );

      await module.exports.packOrder(packPayload, res, false);

    }

    res.json({order});
  },

  /**
   * TODO(Matt): implement this
   * @param {Req} req
   * @param {Res} res
   */
  unpackOrder: function(req, res) {
    res.send('unpackOrder');
  },

  /**
   * TODO(Matt): implement this
   * @param {Req} req
   * @param {Res} res
   */
  getPackedOrder: function(req, res) {
    res.send('getPackedOrder');
  },

  /**
   * TODO(Matt): implement this
   * @param {Req} req
   * @param {Res} res
   */
  schedulePickup: function(req, res) {
    res.send('schedulePickup');
  },

  /**
   * TODO(Matt): implement this
   * @param {Req} req
   * @param {Res} res
   */
  unschedulePickup: function(req, res) {
    res.send('unschedulePickup');
  },

  /**
   * TODO(Matt): implement this
   * @param {Req} req
   * @param {Res} res
   */
  getScheduledPickups: function(req, res) {
    res.send('getScheduledPickups');
  },

  /**
   *
   * @param deliveryParam Pass delivery information like pickup and dropoff address and other params.
   * @returns {Promise<Object>}
   */
  getDeliveryQuote : function(deliveryParam) {
    module.exports.setPostmatesApiKey(deliveryMode);
    return new Promise((resolve, reject) => {
      postmates.quote(deliveryParam, (err, delivery) => {
        if(err) {
          return reject(err);
        }
        return resolve(delivery.body);
      });
    })
  },

  addDelivery : function(deliveryParam) {
    module.exports.setPostmatesApiKey(deliveryMode);
    return new Promise((resolve, reject) => {
      postmates.new(deliveryParam, (err, delivery) => {
        if(err) {
          return reject(err);
        }
        return resolve(delivery.body);
      });
    })
  },

  getEstimatedDeliveryTime: async function(req, res) {
    const deliveryQuoteParams = {
      pickup_address : '901 shasta st, Redwood City, Ca',
      dropoff_address : `${req.query.delivery_address},${req.query.delivery_city},${req.query.delivery_state}`
    };
    const deliveryQuoteResponse = await module.exports.getDeliveryQuote(deliveryQuoteParams);
    return res.json(deliveryQuoteResponse);
  },

  getDeliveryLocationStatus: async function(req, res) {
    const deliveryId = await EnduserDelivery.find({
      where: {order_id: req.query.orderId},
      select: ['delivery_id']
    });
    deliverMethod = await Order.find({
      where: {id: req.query.orderId},
      select: ['delivery_method']
    });
    deliveryMode = deliverMethod[0].delivery_method;
    module.exports.setPostmatesApiKey(deliveryMode);
    const deliveryQuoteResponse = await module.exports.getDeliveryStatus(deliveryId[0].delivery_id);
    return res.json(deliveryQuoteResponse);
  },

  getDeliveryStatus : function(delivery_id) {
    module.exports.setPostmatesApiKey(deliveryMode);
    return new Promise((resolve, reject) => {
      postmates.get(delivery_id, (err, delivery) => {
        if(err) {
          return reject(err);
        }
        return resolve(delivery.body);
      });
    })
  },

  setPostmatesApiKey: function(mode) {
    if (mode === 'delivery_real') {
      postmates = new Postmates(
        'cus_LoItS9bvreQaSV',
        'a980e95c-094b-47fb-99cb-1e9ab0fef8f1'
      );
    } else {
      postmates = new Postmates(
        'cus_LoItS9bvreQaSV',
        '89be15de-1220-4905-b0f0-cd3c4306ecc3'
      );
    }
  }

};
