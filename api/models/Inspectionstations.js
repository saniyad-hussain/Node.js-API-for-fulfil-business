/**
 * Inspectionstations.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    location: {
    	type: 'string',
    	required: true
    },
    version: {
    	type: 'number',
    	required: true
    }
  }
};
