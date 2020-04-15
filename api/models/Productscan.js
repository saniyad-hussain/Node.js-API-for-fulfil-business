/**
 * Productscan.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    upc: {
    	type: 'string',
    	required: true
    },
    image: {
    	type: 'string',
    	required: true
    },
    nutritional_facts: {
    	type: 'string',
    	required: true
    }
  }
};
