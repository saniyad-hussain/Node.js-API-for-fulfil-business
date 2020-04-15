/**
 * Cart.js
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
    api_key : {
      type : 'string',
      required : false
    }
  },

  /**
   *
   * @param {Number} userId
   * @param {String} key
   * @returns {Array}
   */
  async addToCartByUser(userId, key) {
    const SQL = 'INSERT INTO cart (user_id, createdAt, updatedAt, api_key) ' +
      'SELECT * FROM (SELECT $1 as user_id, UNIX_TIMESTAMP(NOW())' +
      ' * 1000 as createdAt, UNIX_TIMESTAMP(NOW()) * 1000 as updatedAt, $2)' +
      ' as TMP WHERE NOT EXISTS (SELECT * from cart WHERE user_id = $1 and' +
      ' api_key = $2) ' +
      'LIMIT 1;';
    const result = await sails.sendNativeQuery(SQL, [userId, key]);
    return result.rows;
  },

  /**
   *
   * @param {Number} userId
   * @param {String} key
   * @returns {Array}
   */
  async getCartByUser(userId, key) {
    const SQL = 'SELECT * FROM cart where user_id = $1 and api_key = $2 LIMIT 1';
    const result = await sails.sendNativeQuery(SQL, [userId, key]);
    return result.rows;
  },

  /**
   *
   * @param {Number} cartId
   * @param {String} key
   * @returns {Array}
   */
  async getSelectableItemsFromCart(cartId, key) {
    const SQL = 'select product.name, product.id, cartitem.cart_id, product' +
      '.`is_selectable_meat` from cartitem join product on cartitem.product_i' +
      'd = product.id where cart_id = $1 and product.is_selectable_meat = true ' +
      'and cartitem.api_key = $2';
    const result = await sails.sendNativeQuery(SQL, [cartId, key]);
    return result.rows;
  },

  /**
   *
   * @param {Number} cartId
   * @param {Number} productId
   * @param {String} key
   * @returns {Array}
   */
  async getReservedProduct(cartId, productId, key) {
    const SQL = 'SELECT * from inventory WHERE reservation_cart_id = $1 ' +
      'AND product_id = $2 AND is_reserved = true and api_key = $3';
    const result = await sails.sendNativeQuery(SQL, [cartId, productId, key]);
    return result.rows;
  },

  /**
   *
   * @param {Number} productId
   * @param {Number} cartId
   * @param {String} key
   * @returns {Array}
   */
  async releaseReservationOfProduct(productId, cartId, key) {
    const SQL = 'Update inventory set is_reserved  = false, ' +
      'reservation_cart_id = NULL where product_id = $1 AND ' +
      'reservation_cart_id = $2 AND is_reserved = true AND api_key = $3';
    const result = await sails.sendNativeQuery(SQL, [productId, cartId, key]);
    return result.rows;
  },

  /**
   *
   * @param {Number} productId
   * @param {Number} cartId
   * @param {String} key
   * @returns {Array}
   */
  async releaseReservationOfOneProduct(productId, cartId, key) {
    const SQL = 'Update inventory set is_reserved  = false, ' +
      'reservation_cart_id = NULL where product_id = $1 AND ' +
      'reservation_cart_id = $2 AND is_reserved = true AND api_key = $3 LIMIT 1';
    const result = await sails.sendNativeQuery(SQL, [productId, cartId, key]);
    return result.rows;
  },

  /**
   *
   * @param {Number} productId
   * @param {Number} cartId
   * @param {String} key
   * @returns {Number}
   */
  async deleteCartItem(productId, cartId, key) {
    const SQL = 'DELETE from cartitem where product_id = $1 AND cart_id = $2 ' +
      'AND api_key = $3';
    const result = await sails.sendNativeQuery(SQL, [productId, cartId, key]);
    return result.affectedRows;
  },

  /**
   *
   * @param {Number} productId
   * @param {Number} cartId
   * @param {String} key
   * @returns {Number}
   */
  async deleteOneCartItem(productId, cartId, key) {
    const SQL = 'DELETE from cartitem where product_id = $1 AND cart_id = $2' +
      ' AND api_key = $3 LIMIT 1';
    const result = await sails.sendNativeQuery(SQL, [productId, cartId, key]);
    return result.affectedRows;
  },

  /**
   *
   * @param {Number} cartId
   * @param {Number} inventoryId
   * @param {String} key
   * @returns {Number}
   */
  async reserveProduct(cartId, inventoryId, key) {
    const SQL = 'Update inventory set is_reserved  = true, ' +
      'reservation_cart_id = $1 where id = $2 and api_key = $3';
    const result = await sails.sendNativeQuery(SQL, [cartId, inventoryId, key]);
    return result.affectedRows;
  }
};
