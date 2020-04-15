/**
 * Product.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    name: {
    	type: 'string',
    	required: true,
    	allowNull: false
    },
    variant_id: {
    	type: 'number',
    	required: false,
    	allowNull: true
    },
    sku: {
    	type: 'number',
    	required: false,
    	allowNull: true
    },
    upc: {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    price: {
    	type: 'number',
    	required: false,
    	allowNull: true
    },
    sale_price: {
    	type: 'number',
    	required: false,
    	allowNull: true
    },
    long_description: {
    	type: 'string',
    	required: false,
    	allowNull: true
    },
    short_description: {
    	type: 'string',
    	required: false,
    	allowNull: true
    },
    category_id: {
    	type: 'number',
    	required: false,
    	allowNull: true
    },
    brand: {
    	type: 'string',
    	required: false,
    	allowNull: true
    },
    thumb: {
    	type: 'string',
    	required: false,
    	allowNull: true
    },
    image: {
    	type: 'string',
    	required: false,
    	allowNull: true
    },
    label: {
    	type: 'string',
    	required: false,
    	allowNull: true
    },
    alt_img_1: {
    	type: 'string',
    	required: false,
    	allowNull: true
    },
    alt_img_2: {
    	type: 'string',
    	required: false,
    	allowNull: true
    },
    alt_img_3: {
    	type: 'string',
    	required: false,
    	allowNull: true
    },
    is_selectable_meat: {
      type: 'boolean',
      required: false,
    	allowNull: true
    },
    is_selectable_produce: {
      type: 'boolean',
      required: false,
    	allowNull: true
    },
    nominal_size: {
      type: 'string',
      required: false,
    	allowNull: true
    },
    unit_type: {
      type: 'string',
      required: false,
    	allowNull: true
    },
    api_key : {
      type : 'string',
      required : true
    },
    min_qty : {
      type: 'number',
      required: false,
      allowNull: true
    }
  },

  notNegativeConstraintColumns : [
    'price',
    'min_qty',
    'sale_price',
    'sku'
  ],

  getAnnotationProducts : async (key) => {
    const SQL = `SELECT * FROM (SELECT inv.product_id AS id, IFNULL((SELECT name FROM product ` +
      `WHERE id=inv.product_id), '') AS name, (SELECT sku FROM product WHERE id=inv.product_id) ` +
      `AS sku, (SELECT api_key FROM product WHERE id=inv.product_id) AS api_key FROM images AS ` +
      `im, inventory AS inv WHERE inv.id = im.inventory_id GROUP BY inv.product_id) AS DATA WHERE ` +
      `api_key=$1 AND NAME != ''`;
    let result = await sails.sendNativeQuery(SQL, [key]);
    return result.rows;
  },

  /**
   * Get available inventory items
   * @param {Number} limit
   * @param {String} key
   * @param {String} name
   * @param {Number} fromPrice
   * @param {Number} toPrice
   * @param {String} category
   * @returns {Array} return available inventory rows
   */
  async getProductSearch(limit, key, name, fromPrice, toPrice, category) {
    let filter = '';
    if ((fromPrice !== '' && fromPrice !== undefined) &&
      (toPrice !== '' && toPrice !== undefined)) {
        filter = `AND (product.price > ${fromPrice} AND product.price < ${toPrice})`;
    }
    if (name !== undefined) {
      filter += `AND (product.name LIKE '%${name}%')`;
    }
    if (category !== undefined) {
      filter += `AND (category.name LIKE '%${category}%')`;
    }
    let SQL = `SELECT product.*, category.name AS category from inventory join ` +
      `product on inventory.product_id = product.id JOIN category ON category.id = ` +
      `product.category_id where (inventory.is_reserved = 0) AND (inventory.api_key = ` +
      `$1) ${filter} group by id`;
    SQL += limit ? ` LIMIT ${limit}` : '';
    const result = await sails.sendNativeQuery(SQL, [key]);
    return result.rows;
  }
};
