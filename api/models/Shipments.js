/**
 * Shipments.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    purchase_order: {
      type: 'string',
      required: true
    },
    product_id: {
      type: 'number',
      required: true
    },
    quantity_ordered: {
      type: 'number',
      required: true
    },
    received_qty: {
      type: 'number',
      required: false
    },
    expected_delivery_date: {
      type: 'string',
      columnType: 'datetime',
      required: true
    },
    note: {
      type: 'string',
      required: false,
      allowNull: true
    },
    delivery_status: {
      type: 'number',
      required: false
    },
    api_key: {
      type: 'string',
      required: false
    },
    box_id: {
      type: 'string',
      required: false,
      allowNull: true
    }
  }

};

