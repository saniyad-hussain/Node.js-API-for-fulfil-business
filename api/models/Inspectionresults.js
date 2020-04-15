/**
 * Inspectionresults.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    inventory_id: {
    	type: 'number',
    	required: false
    },
    uuid: {
    	type: 'string',
    	required: false
    },
    inspection_station: {
    	type: 'number',
    	required: false
    },
    time_inspected: {
    	type: 'string',
    	required: false
    },
    size_width: {
    	type: 'number',
    	required: false
    },
    size_height: {
    	type: 'number',
    	required: false
    },
    inspected: {
    	type: 'boolean',
    	required: false
    },
    uploaded: {
    	type: 'boolean',
    	required: false
    },
    operator_id: {
    	type: 'number',
    	required: false
    }
  }
};
