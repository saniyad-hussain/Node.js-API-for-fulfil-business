/**
 * Stockorder.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    time_ordered: {
    	type: 'string',
    	required: true
    },
    status: {
    	type: 'number',
    	required: true
    },
    supplier_id: {
    	type: 'number',
    	required: true
    },
    expected_delivery_time: {
    	type: 'string',
    	required: true
    }
  }

};

