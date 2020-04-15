/**
 * Labeljobs.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    job_id: {
    	type: 'number',
    	required: true
    },
    precision: {
    	type: 'number',
    	required: false
    },
    recall: {
    	type: 'number',
    	required: false
    },
    test_dataset: {
    	type: 'number',
    	required: true
    },
    class: {
    	type: 'string',
    	required: false
    }
  }
};
