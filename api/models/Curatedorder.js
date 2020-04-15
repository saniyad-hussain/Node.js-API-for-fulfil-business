/**
 * Curatedorder.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    order_title: {
    	type: 'string',
    	required: true
    },
    order_items: {
    	type: 'string',
    	required: true
    }
  }
};
