/**
 * Temporarystoragelocations.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    room : {
      type : 'string',
      required : true,
      allowNull: false
    },
    bin : {
      type : 'string',
      required : true,
      allowNull: false
    },
    row : {
      type : 'number',
      required: true,
      allowNull: false
    },
    column : {
      type : 'number',
      required: true,
      allowNull: false
    }

  }

};

