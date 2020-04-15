/**
 * Curatedorder.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    first_name: {
    	type: 'string',
    	required: true
    },
    last_name: {
    	type: 'string',
    	required: true
    },
    email: {
    	type: 'string',
    	required: false
    },
    password: {
    	type: 'string',
    	required: true
    }
  }
};
