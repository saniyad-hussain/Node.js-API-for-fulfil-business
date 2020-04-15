/**
 * Boundingboxlabels.js
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
    x1: {
    	type: 'number',
    	required: true
    },
    y1: {
    	type: 'number',
    	required: true
    },
    x2: {
    	type: 'number',
    	required: true
    },
    y2: {
    	type: 'number',
    	required: true
    },
    version: {
    	type: 'number',
    	required: true
    },
    date_created: {
    	type: 'string',
    	required: true
    },
    source: {
    	type: 'string',
    	required: true
    },
    labeler: {
    	type: 'string',
    	required: true
    },
    job_id: {
    	type: 'number',
    	required: true
    }
  }
};
