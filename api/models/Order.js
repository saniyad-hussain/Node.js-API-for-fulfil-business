/**
 * Order.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    user_id: {
    	type: 'number',
    	required: true
    },
    cart_id: {
    	type: 'number',
    	required: true
    },
    order_total: {
    	type: 'number',
    	required: true
    },
    card_number: {
    	type: 'string',
    	required: true
    },
    expiration: {
    	type: 'string',
    	required: true
    },
    csv: {
    	type: 'string',
    	required: true
    },
    billing_name: {
    	type: 'string',
    	required: true
    },
    billing_address: {
    	type: 'string',
    	required: true
    },
    billing_city: {
    	type: 'string',
    	required: true
    },
    billing_zipcode: {
    	type: 'string',
    	required: true
    },
    billing_country: {
    	type: 'string',
    	required: true
    },
    delivery_address: {
    	type: 'string',
    	required: true
    },
    delivery_city: {
    	type: 'string',
    	required: true
    },
    delivery_zipcode: {
    	type: 'string',
    	required: true
    },
    delivery_time: {
    	type: 'string',
    	required: true
    },
    note: {
    	type: 'string',
    	required: false
    },
    delivery_apt: {
      type: 'string',
      required: true
    },
    delivery_state: {
      type: 'string',
      required: true
    },
    billing_state: {
      type: 'string',
      required: true
    },
    billing_apartment: {
      type: 'string',
      required: true
    },
    delivery_name: {
      type: 'string',
      required: true
    },
    delivery_country: {
      type: 'string',
      required: true
    },
    delivery_method: {
      type: 'string',
      required: true
    },
    api_key : {
      type : 'string',
      required : false
    }
  },

  getOrdersByUser : async (userId, key) => {
    const SQL = 'select `order`.id as order_id, order.cart_id, `order`.' +
      'order_total, product.name, product.id as product_id, product.price, ' +
      ' product.sale_price, product.long_description, product.short_descrip' +
      'tion, product.brand, product.image, product.label, product.nominal_s' +
      'ize, product.unit_type, order.createdAt as order_date from `order`	join `cartitem`' +
      ' on `order`.cart_id=`cartitem`.cart_id join product on cartitem.' +
      'product_id = product.id	where `order`.user_id = $1 and `order`.api_key = $2' +
      'order by `order`.createdAt desc';
    const result = await sails.sendNativeQuery(SQL, [userId, key]);
    return result.rows;
  },

  /**
   * @param {Object} data
   */
  getAllOrders : async (data) => {
    let SQL = 'select `order`.id as order_id, order.cart_id, `order`.' +
      'order_total, product.name, product.id as product_id, product.price, ' +
      ' product.sale_price, product.long_description, product.short_descrip' +
      'tion, product.brand, product.image, product.label, product.nominal_s' +
      'ize, product.unit_type, order.createdAt as order_date from `order`	join `cartitem`' +
      ' on `order`.cart_id=`cartitem`.cart_id join product on cartitem.' +
      'product_id = product.id	 ' +
      'order by `order`.createdAt desc';
    SQL += data.limit ? ` LIMIT ${data.limit}` : '';
    SQL += data.from ? ` OFFSET ${data.from}` : '';
    const result = await sails.sendNativeQuery(SQL);
    return result.rows;
  },

  packOrderbyId : async (cartId, createdAt, key) => {
    const SQL = `
    SELECT
        id inventory_id, product_id, IFNULL(grade_id, 'NO') grade_id
    FROM
        inventory
    WHERE
        reservation_cart_id = $1
            AND reservation_expires > $2
            AND is_reserved = 2
            AND api_key = $3
    `;
    const result = await sails.sendNativeQuery(SQL, [cartId, createdAt, key]);
    return result.rows;
  },

  getOrderDetailForDelivery : async (cartId, key) => {
    const SQL = `
    SELECT
      product_id, MAX(name) product_name, COUNT(i.id) qty
    FROM
        inventory i
            JOIN
        product p ON i.product_id = p.id
    WHERE
        i.is_reserved = 2
            AND i.reservation_cart_id = $1
            AND i.api_key = $2
    GROUP BY i.product_id
    `;
    const result = await sails.sendNativeQuery(SQL, [cartId, key]);
    return result.rows;
  },

  allOrders : async () => {
    const SQL = 'select `order`.id as order_id, order.cart_id, `order`.' +
    'order_total, product.name, product.id as product_id, product.price, ' +
    ' product.sale_price, product.long_description, product.short_descrip' +
    'tion, product.brand, product.image, product.label, product.nominal_s' +
    'ize, product.unit_type, order.createdAt as order_date from `order`	join `cartitem`' +
    ' on `order`.cart_id=`cartitem`.cart_id join product on cartitem.' +
    'product_id = product.id	 ' +
    'order by `order`.createdAt desc';
    const result = await sails.sendNativeQuery(SQL);
    return result.rows;
  },

  /**
   * Giving total order per product to re-order the item for maintain to min qty
   * @param {String} apiKey
   * @returns {Array}
   */
  reOrderReport : async (apiKey) => {
    const SQL = `
    SELECT
     product_id,
     product_name,
     min_qty,
     total_qty,
     (min_qty - total_qty) reorder
    FROM
        (
          SELECT
              i.product_id,
              COUNT(i.id) total_qty,
              MAX(min_qty) min_qty,
              max(p.name) product_name
          FROM
              inventory i,
              product p
          WHERE
              i.product_id = p.id
              AND i.api_key = $1
              AND i.is_reserved = 0
          GROUP BY i.product_id
          HAVING COUNT(i.id) < MAX(min_qty)
          AND MAX(i.expires) > $2
        ) AS tbl`;
    const currentTimestamp = new Date().getTime();
    const result = await sails.sendNativeQuery(SQL, [apiKey, currentTimestamp]);
    return result.rows;
  },

  /***
   * Return list of inventory which is got expired now
   * @param {String} apiKey
   * @returns {Array}
   */
  expiredInventory : async (apiKey) => {
    const SQL = `
     SELECT
        i.id inventory_id,
        p.name,
        i.expires
     FROM
        inventory i,
        product p
     WHERE
        i.product_id = p.id
            AND i.api_key = $1
            AND expires > $2
    `;
    const currentTimestamp = new Date().getTime();
    const result = await sails.sendNativeQuery(SQL, [apiKey, currentTimestamp]);
    return result.rows;
  },

  stockToReorderReport : async (apiKey) => {
    const SQL = `
      SELECT
          GROUP_CONCAT(product_id) product,
          MAX(name) name,
          AVG(min_qty) min_qty,
          AVG(lead_time) lead_time,
          AVG(average_sold_per_day) average_sold_per_day,
          AVG(qty_not_expiring_today_or_expired) qty_not_expiring_today_or_expired,
          AVG(need_to_order) need_to_order
      FROM
          (SELECT
              product_id,
                  name,
                  min_qty,
                  lead_time,
                  average_sold_per_day,
                  qty_not_expiring_today_or_expired,
                  (((min_qty + (lead_time * average_sold_per_day * 2)) - qty_not_expiring_today_or_expired) * - 1) need_to_order,
                  product_variant
          FROM
              (SELECT
              a.id product_id,
                  if (variant_id IS NULL, name, variant_name) name,
                  IFNULL(min_qty, 0) min_qty,
                  IFNULL(lead_time, 0) lead_time,
                  CAST(IFNULL(average_sold_per_day, 0) * 2 AS DECIMAL (10)) average_sold_per_day,
                  IFNULL(qty_not_expiring_today_or_expired, 0) qty_not_expiring_today_or_expired,
                  IFNULL(variant_id, a.id) product_variant
          FROM
              product a
          JOIN metadata m ON a.id = m.product_id
          LEFT JOIN (SELECT
              product_id, COUNT(*) / 365 average_sold_per_day
          FROM
              inventory
          WHERE
              reservation_cart_id IN (SELECT DISTINCT
                      cart_id
                  FROM
                      \`order\`
                  JOIN cart ON \`order\`.cart_id = cart.id)
          GROUP BY product_id) aspd ON a.id = aspd.product_id
          LEFT JOIN (SELECT
              product_id, COUNT(*) qty_not_expiring_today_or_expired
          FROM
              inventory
          WHERE
              api_key = $1
                  AND reservation_cart_id IS NULL
                  AND expires > $2
                  AND api_key = $1
          GROUP BY product_id) net ON a.id = net.product_id
          LEFT JOIN (SELECT
              group_name AS variant_name, id
          FROM
              variants) var ON a.variant_id = var.id) tbl
          WHERE
              qty_not_expiring_today_or_expired < min_qty) AS a
      GROUP BY product_variant
    `;
    const currentTimestamp = new Date().getTime();
    const result = await sails.sendNativeQuery(SQL, [apiKey, currentTimestamp]);
    return result.rows;
  }
};
