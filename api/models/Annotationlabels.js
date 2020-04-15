/**
 * Annotationlabels.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    group_id: {
    	type: 'number',
    	required: true
    },
    label_name: {
    	type: 'string',
    	required: true
    },
    version: {
    	type: 'number',
    	required: true
    }
  }
};
