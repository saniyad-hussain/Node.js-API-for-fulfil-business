/**
 * Inventory.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    location_id: {
    	type: 'number',
    	required: true
    },
    is_graded_item: {
      type: 'boolean',
      required: true
    },
    product_id: {
    	type: 'number',
    	required: true
    },
    factory_inventory_id: {
      type: 'string',
      required: true
    },
    is_reserved: {
      type: 'number',
      allowNull: true,
      required: false
    },
    reservation_expires: {
      type: 'number',
      allowNull: true,
      required: false
    },
    reservation_cart_id: {
      type: 'number',
      allowNull: true,
      required: false
    },
    grade_id: {
    	type: 'number',
      allowNull: true,
    	required: false
    },
    note: {
    	type: 'string',
      allowNull: true,
    	required: false
    },
    price_override: {
    	type: 'number',
      allowNull: true,
    	required: false
    },
    productgrade_id: {
    	type: 'number',
      allowNull: true,
    	required: false
    },
    weight_override: {
      type: 'number',
      allowNull: true,
      required: false
    },
    image_override: {
    	type: 'string',
      allowNull: true,
    	required: false
    },
    scan_data: {
    	type: 'string',
      allowNull: true,
    	required: false
    },
    api_key : {
      type : 'string',
      required : false
    },
    environment : {
      type: 'number',
      allowNull: true,
      required: false
    },
    index : {
      type: 'number',
      allowNull: true,
      required: false
    },
    lane_id : {
      type: 'number',
      allowNull: true,
      required: false
    },
    slot_id : {
      type: 'number',
      allowNull: true,
      required: false
    },
    stack_id : {
      type: 'number',
      allowNull: true,
      required: false
    },
    vlm_id : {
      type: 'number',
      allowNull: true,
      required: false
    },
    width : {
      type: 'number',
      allowNull: true,
      required: false
    },
    height : {
      type: 'number',
      allowNull: true,
      required: false
    },
    length : {
      type: 'number',
      allowNull: true,
      required: false
    },
    order_id : {
      type: 'number',
      allowNull: true,
      required: false
    },
    productgrade_id : {
      type : 'number',
      required : false,
      allowNull: true
    }
  },

  /**
   * Get reserve inventory item by cart id and key
   * @param {Number} cartId
   * @param {String} key
   * @returns {Object} reserved products
   */
  async getReserveInventoryByCart(cartId, key) {
    const SQL = 'SELECT inventory.product_id, 1 as quantity, product.price, ' +
      'product.sale_price from inventory join product on ' +
      'inventory.product_id = product.id where reservation_cart_id = $1 ' +
      ' and is_reserved = 1 and reservation_expires > $2 and ' +
      'inventory.api_key = $3';
    const result = await sails.sendNativeQuery(SQL, [cartId, new Date().getTime(), key]);
    return result.rows;
  },

  /**
   * To make inventory reservation
   * @param {Number} id
   * @param {Number} expires
   * @param {Number} cartId
   * @param {string} key
   * @returns {Number} return reserved inventory count
   */
  async reserveInventory(id, expires, cartId, key) {
    let SQL = '';
    if (cartId) {
      SQL = 'UPDATE `inventory` SET is_reserved = 1, ' +
        'reservation_expires = $1, reservation_cart_id = $3 ' +
        'where id = $2 and api_key = $4 LIMIT 1';
    } else {
      SQL = 'UPDATE `inventory` SET is_reserved = 1, ' +
        'reservation_expires = $1 where id = $2 and api_key = $4 LIMIT 1';
    }
    const _cartId = cartId || undefined;
    const result = await sails.sendNativeQuery(SQL, [expires, id, _cartId, key]);
    return result.affectedRows;
  },

  /**
   * Release reservation from inventory by cart id and key
   * @param {Number} cartId
   * @param {String} key
   * @returns {Number} return release reservation count by cart
   */
  async releaseReservationByCart(cartId, key) {
    const SQL = 'UPDATE `inventory` SET is_reserved = 0, ' +
      'reservation_cart_id = NULL where reservation_cart_id = $1 ' +
      ' and api_key = $2 LIMIT 1';
    const result = await sails.sendNativeQuery(SQL, [cartId, key]);
    return result.affectedRows;
  },

  /**
   * Release reservation by inventory id and key
   * @param {Number} inventoryId
   * @param {String} key
   * @returns {Number} return release reservation count by inventory
   */
  async releaseReservationByInventory(inventoryId, key) {
    const SQL = 'UPDATE `inventory` SET is_reserved = 0 where ' +
      'id = $1 and api_key = $2 LIMIT 1';
    const result = await sails.sendNativeQuery(SQL, [inventoryId, key]);
    return result.affectedRows;
  },

  /**
   * Get available inventory items
   * @param {Number} limit
   * @param {String} key
   * @returns {Array} return available inventory rows
   */
  async getAvailableInventory(limit, key) {
    let SQL = `select product.* ` +
      `from inventory join product on inventory.product` +
      `_id = product.id  where (inventory.is_reserved = 0)` +
      ` and (inventory.api_key = $1) group by id`;
    SQL += limit ? ` LIMIT ${limit}` : '';
    const result = await sails.sendNativeQuery(SQL, [key]);
    return result.rows;
  }

};
