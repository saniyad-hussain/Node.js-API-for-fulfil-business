/**
 * EnduserDelivery.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    delivery_id: {
      type: 'string',
      required: true
    },
    order_id: {
      type: 'number',
      required: true
    },
    expected_delivery_date: {
      type: 'string',
      required: true
    },
    note: {
      type: 'string',
      required: false,
      allowNull: true
    },
    delivery_status: {
      type: 'string',
      required: false
    },
    api_key: {
      type: 'string',
      required: false
    }
  }
};
