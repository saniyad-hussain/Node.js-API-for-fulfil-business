/**
 * PaymentType.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    card_number: {
    	type: 'string',
    	required: true
    },
    expiration: {
    	type: 'number',
    	required: true
    },
    csv: {
    	type: 'number',
    	required: true
    },
    type: {
    	type: 'string',
    	required: true
    },
    billing_first: {
    	type: 'string',
    	required: true
    },
    billing_last: {
    	type: 'string',
    	required: true
    },
    billing_address: {
    	type: 'string',
    	required: true
    },
    label: {
    	type: 'string',
    	required: true
    },
    is_default: {
    	type: 'boolean',
    	defaultsTo: false
    }
  }
};
