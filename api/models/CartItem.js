/**
 * CartItem.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    product_id: {
    	type: 'number',
    	required: true
    },
    quantity: {
    	type: 'number',
    	required: true
    },
    cart_id: {
      type: 'number',
      required: true
    },
    is_virtual: {
      type: 'boolean',
      required: false
    },
    api_key : {
      type : 'string',
      required : false
    }
  }
};
