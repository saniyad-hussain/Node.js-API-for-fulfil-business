/**
 * Locations.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    name: {
    	type: 'string',
    	required: true
    },
    lat: {
    	type: 'number',
    	required: false
    },
    lon: {
    	type: 'number',
    	required: false
    },
    type: {
    	type: 'string',
    	required: true
    }
  }
};
