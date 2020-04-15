const inventoryController = require('./InventoryController');
/**
 * CartController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const self = module.exports = {

    /**
     * Creates a cart for a user by the user key
     * @param {Req} req
     * @param {Res} res
     * @GET userKey
     * @returns {Object}
     */
    createCart: async function(req, res) {

      const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowCartOperation');
      if (!allowQueryAllOrders) {
        return res.status(500).json({
          message : 'You are not authorized to access this resource.'
        });
      }

      const userKey = req.param('userKey');

      if(!userKey) {
        return res.sendStatus(500);
      }

      const id = User.decryptUserKey(userKey);
      if (!id) {
        res.sendStatus(500);
        return;
      }
      // If a user logs in on two devices, the system should return only 1 cart
      // If a user uses a device for the first time, it should create only 1
      // cart.
      // This single complex INSERT is essentially:
      // if (!has_cart) {... create cart ...}
      await Cart.addToCartByUser(id, req.key);
      const rawSelectResult = await Cart.getCartByUser(id, req.key);
      res.json(rawSelectResult);
    },

    /**
     * Sub-router for /user/get which either calls getCartById or getCartByKey
     * depending on which params are set. If both set, returns getCartById.
     * @param {Req} req
     * @param {Res} res
     * @GET id || @GET userKey
     * @returns {Object}
     */
    getCart: async function(req, res) {

      const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowCartOperation');
      if (!allowQueryAllOrders) {
        return res.status(500).json({
          message : 'You are not authorized to access this resource.'
        });
      }

      const id = req.param('id');
      const userKey = req.param('userKey');
      if (id) {
        self.getCartById(req, res, id);
      } else if (userKey) {
        self.getCartByKey(req, res, userKey);
      } else {
        sails.helpers.logger('error', 'getCart requires '+
            'either @GET id or @GET userKey');
        res.sendStatus(500);
      }
    },

    /**
     * given an encrypted userKey, return the cart object
     * @param {Req} req
     * @param {Res} res
     * @param {String} userKey
     * @returns {Object}
     */
    getCartByKey: async function(req, res, userKey) {

      const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowCartOperation');
      if (!allowQueryAllOrders) {
        return res.status(500).json({
          message : 'You are not authorized to access this resource.'
        });
      }

      if (!userKey) {
        res.status(500);
        return;
      }
      const id = User.decryptUserKey(userKey);
      if (!id) {
        res.status(500);
        return;
      }
      const cart = await Cart.findOne({'user_id': id, 'api_key' : req.key});
      if (!cart) {
        res.status(500);
        sails.helpers.logger('error', `${'No cart rows '+
            'were found for user id: '}${ id}`);
        return;
      }
      res.status(200).json({'data': cart});
    },

    /**
     * given a cart id, return the cart object
     * @param {Req} req
     * @param {Res} res
     * @param {string} id
     * @returns {Object}
     */
    getCartById: async function(req, res, id) {

      const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowCartOperation');
      if (!allowQueryAllOrders) {
        return res.status(500).json({
          message : 'You are not authorized to access this resource.'
        });
      }

      if (!id) {
        res.status(500);
        return;
      }
      const cart = await Cart.findOne({'id': id, 'api_key': req.key});
      if (!cart) {
        res.status(500);
        sails.helpers.logger('error', `${'No cart rows '+
            'were found for cart id: '}${ id}`);
        return;
      }
      res.status(200).json({'data': cart});
    },

    /**
     * 1.) verify item can be reserved
     * 2.) mark the item as reserved
     * 3.) add the item to cart
     * if 1,2, & 3 all work... return true else return false.
     * @param {Req} req
     * @param {Res} res
     * @Get {Number} cart_id
     * @Get {Number} product_id
     * @returns {Object}
     */
     addToCart: async function(req, res) {

      const allowQueryAllOrders = await sails.helpers.checkPermissions(
        req,
        'allowAddRemoveItemFromCart'
      );
      if (!allowQueryAllOrders) {
        return res.status(500).json({
          message : 'You are not authorized to access this resource.'
        });
      }

       if (!req.param('product_id')) {
         res.sendStatus(500);
         return;
       }
       if (!req.param('cart_id')) {
         res.sendStatus(500);
         return;
       }
       // first check if its a selectable_product
       const product = await Product.find({
         where: {
           id: req.param('product_id'),
           api_key : req.key
         },
         limit: 1
       });
       // selectable items are "virtual in that there is no global inventory".
       // instead we add the item to cart, without reserving the inventory,
       // because the user will select the item from inventory at checkout.
       if (!!product[0].is_selectable_meat) {
         const insertData = {};
         insertData['product_id'] = product[0].id;
         insertData['cart_id'] = req.param('cart_id');
         insertData['quantity'] = 1;
         insertData['is_virtual'] = true;
         insertData['api_key'] = req.key;
         const item = await CartItem.create(insertData).fetch();
         res.json(item);
         return;
       }

       await inventoryController.attemptReserve(req, res)
        .then(async json => {
          if (json.hasOwnProperty('is_reserved') && json.is_reserved === true) {
            const insertData = {};
            insertData['product_id'] = json['product_id'];
            insertData['cart_id'] = req.param('cart_id');
            insertData['quantity'] = 1;
            insertData['is_virtual'] = false;
            insertData['api_key'] = req.key;
            const item = await CartItem.create(insertData).fetch();
            res.json(item);
          } else {
            res.send(json);
          }
        });
     },

     /**
      * @param {Req} req
      * @param {Res} res
      * @Get cart_id
      */
     doesCartRequireSelections: async function(req, res) {
       if (!req.param('cart_id')) {
         res.sendStatus(500);
         return;
       }
      // step 1 get the selectable items from the cart
      const selectableItems = await Cart.getSelectableItemsFromCart(
        req.param('cart_id'),
        req.key
      );
      // step 2 combine duplicates and get a count
      const collapsed = {};
      let numProps = 0;
      selectableItems.forEach((item) => {
        if (collapsed[item.id] === undefined) {
          collapsed[item.id] = {};
          collapsed[item.id].data = item;
          collapsed[item.id].count = 0;
        }
        collapsed[item.id].count++;
        numProps++;
      });

      // step 3 check to see if the inventory table has items reserved matching

      // if we have no selectable meats we are done
      if (numProps === 0) {
        res.send({'status': false});
        return;
      }
      // we do have some meats to process
      let areAllItemsInCartReserved = true;
      for(const i in collapsed) {
        const itemToVerify = collapsed[i];
        await(async function(itemToVerify) {
          const result = await Cart.getReservedProduct(
            itemToVerify.data.cart_id,
            itemToVerify.data.id,
            req.key
          );
          areAllItemsInCartReserved = result.length === numProps;
        })(itemToVerify);
      }
      res.send({'status': !areAllItemsInCartReserved});
    },

    /**
     * The key difference between this and removeFromCart is this deletes all
     * products vs just one at a time.
     * @param {Req} req
     * @param {Res} res
     * @Get cart_id
     * @Get product_id
     * @returns {Object}
     */
    removeAllFromCart: async function(req, res) {

      const allowQueryAllOrders = await sails.helpers.checkPermissions(
        req,
        'allowAddRemoveItemFromCart'
      );
      if (!allowQueryAllOrders) {
        return res.status(500).json({
          message : 'You are not authorized to access this resource.'
        });
      }

      if (!req.param('product_id')) {
        res.sendStatus(500);
        return;
      }
      if (!req.param('cart_id')) {
        res.sendStatus(500);
        return;
      }

      await Cart.releaseReservationOfProduct(
        req.param('product_id'),
        req.param('cart_id'),
        req.key
      );

      // now delete cart item
      const result = await Cart.deleteCartItem(
        req.param('product_id'),
        req.param('cart_id'),
        req.key
      );
      if (result > 0) {
        res.json({'status': 'OK'});
      } else {
        sails.helpers.logger('error', 'some '+
            'sql error occured with removeFromCart');
        res.sendStatus(500);
      }
    },

     /**
      * @param {Req} req
      * @param {Res} res
      * @Get cart_id
      * @Get product_id
      * @returns {Object}
      */
     removeFromCart: async function(req, res) {

       const allowQueryAllOrders = await sails.helpers.checkPermissions(
         req,
         'allowAddRemoveItemFromCart'
       );
       if (!allowQueryAllOrders) {
         return res.status(500).json({
           message : 'You are not authorized to access this resource.'
         });
       }

       if (!req.param('product_id')) {
         res.sendStatus(500);
         return;
       }
       if (!req.param('cart_id')) {
         res.sendStatus(500);
         return;
       }
       // first check if its a selectable_product
       const product = await Product.find({
         where: {
           id: req.param('product_id'),
           api_key : req.key
         },
         limit: 1
       });
       if (!!product[0].is_selectable_meat === false) {
         // a normal product so also delete inventory
         await Cart.releaseReservationOfOneProduct(
           req.param('product_id'),
           req.param('cart_id'),
           req.key
         );
       }
       // now delete cart item
       const result = await Cart.deleteOneCartItem(
         req.param('product_id'),
         req.param('cart_id'),
         req.key
       );
       if (result > 0) {
         res.json({'status': 'OK'});
       } else {
        sails.helpers.logger('error', 'some '+
             'sql error occured with removeFromCart');
         res.sendStatus(500);
       }
     },

     /**
      * The reason we have this is for selectable items
      * this will mark an existing unreserved item as reserved and in the users
      * cart. At the same time it will add the item to the users cart.
      * @param {Req} req
      * @param {Res} res
      * @Get inventory_id
      * @Get cart_id
      * @returns {Object}
      */
     addToCartByInventoryId: async function(req, res) {

       const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowModifyCart');
       if (!allowQueryAllOrders) {
         return res.status(500).json({
           message : 'You are not authorized to access this resource.'
         });
       }

       if (!req.param('inventory_id')) {
         res.sendStatus(500);
         return;
       }

       if (!req.param('cart_id')) {
         res.sendStatus(500);
         return;
       }

       const result = await Cart.reserveProduct(
         req.param('cart_id'),
         req.param('inventory_id'),
         req.key
       );

       if (result > 0) {
         res.json({'status': 'OK'});
       } else {
         res.sendStatus(500);
       }
     }

};
