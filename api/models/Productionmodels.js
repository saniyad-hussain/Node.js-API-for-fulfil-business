/**
 * Productionmodels.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    product_id : {
      type: 'number',
      required: false,
      allowNull: true
    },
    model_id : {
      type: 'number',
      required: false,
      allowNull: true
    }

  }

};

