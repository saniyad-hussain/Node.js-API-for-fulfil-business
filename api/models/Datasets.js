/**
 * Datasets.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    dataset_id: {
    	type: 'number',
    	required: true
    },
    label_id: {
    	type: 'number',
    	required: true
    },
    image_id: {
    	type: 'number',
    	required: true
    },
    set_type: {
    	type: 'string',
    	required: true
    },
    group_id : {
      type: 'number',
      required: false
    },
    label_version : {
      type: 'number',
      required: false
    }
  }
};
