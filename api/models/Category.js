/**
 * Category.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    name: {
    	type: 'string',
    	required: true
    },
    thumb: {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    api_key : {
      type : 'string',
      required : false,
      allowNull: true
    }
  }
};
