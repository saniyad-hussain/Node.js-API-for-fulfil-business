/**
 * Camerasettings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    upc: {
    	type: 'string',
    	required: false
    },
    camera_id: {
    	type: 'string',
    	required: false
    },
    setting_name: {
    	type: 'string',
    	required: false
    },
    setting_value: {
    	type: 'number',
    	required: false
    }
  }
};
