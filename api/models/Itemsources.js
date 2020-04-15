/**
 * Itemsources.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    supplier_id: {
    	type: 'number',
    	required: true
    },
    product_id: {
    	type: 'number',
    	required: true
    },
    price: {
    	type: 'number',
    	required: true
    },
    active: {
    	type: 'boolean',
    	required: true
    }
  }

};

