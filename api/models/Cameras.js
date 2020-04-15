/**
 * Cameras.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    camera_id: {
    	type: 'string',
    	required: true
    },
    inspection_station: {
    	type: 'number',
    	required: true
    },
    camera_type: {
    	type: 'string',
    	required: true
    },
    position: {
    	type: 'string',
    	required: true
    }
  }
};
