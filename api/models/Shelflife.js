/**
 * Shelflife.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    product_id: {
    	type: 'number',
    	required: true
    },
    lifespan: {
    	type: 'number',
    	required: true
    },
    estimated_transit_time: {
    	type: 'number',
    	required: true
    }
  }

};

