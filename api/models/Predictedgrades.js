/**
 * Predictedgrades.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    model_id_detection: {
    	type: 'number',
    	required: true
    },
    model_id_grading: {
    	type: 'number',
    	required: true
    },
    item_uuid: {
    	type: 'string',
    	required: true
    },
    grade: {
    	type: 'string',
    	required: true
    },
    primary_predicted_defects: {
    	type: 'string',
    	required: false
    }
  }
};
