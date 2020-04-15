/**
 * Test.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  datastore : 'mongodbFactoryData',

  attributes: {

    name : {
      type : 'string',
      required : true
    },

    no : {
      type: 'string',
      required: true
    },

    id: {
      type: 'string',
      columnName: '_id'
    }

  }

};

