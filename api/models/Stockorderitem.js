/**
 * Stockorderitem.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    stock_order_id: {
    	type: 'number',
    	required: true
    },
    note: {
    	type: 'string',
    	required: true
    }
  }

};

