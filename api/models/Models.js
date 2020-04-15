/**
 * Models.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    group_id : {
      type: 'number',
      required: false
    },
    framework: {
    	type: 'string',
    	required: true
    },
    model_url : {
      type: 'string',
      required: false
    },
    version: {
    	type: 'number',
    	required: true
    },
    experiment_id : {
      type: 'number',
      required: false
    },
    model_type : {
      type: 'string',
      required: false
    },
    notes : {
      type: 'string',
      required: false
    }
  }
};
