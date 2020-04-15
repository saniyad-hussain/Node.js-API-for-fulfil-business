/**
 * Detectionpredictions.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    image_id: {
    	type: 'number',
    	required: true
    },
    label: {
    	type: 'string',
    	required: true
    },
    confidence: {
    	type: 'number',
    	required: true
    },
    x1: {
    	type: 'number',
    	required: false
    },
    y1: {
    	type: 'number',
    	required: false
    },
    x2: {
    	type: 'number',
    	required: false
    },
    y2: {
    	type: 'number',
    	required: false
    },
    model_id: {
    	type: 'number',
    	required: true
    }
  }
};
