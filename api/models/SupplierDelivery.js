/**
 * SupplierDelivery.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    purchase_order: {
      type : 'string',
      required : true,
      allowNull: false,
    },
    product_id : {
      type : 'number',
      required: true,
      allowNull: false
    },
    quantity_ordered : {
      type : 'number',
      required: true,
      allowNull: false
    },
    received_qty: {
      type : 'number',
      defaultsTo: 0
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
    box_id : {
      type: 'string',
      allowNull: true
    },
    temporary_location_id : {
      type: 'string',
      required: false,
      allowNull: true
    },
    truck_cold_zone_temp : {
      type: 'string',
      required: false,
      allowNull: true
    },
    truck_freezer_zone_temp : {
      type: 'string',
      required: false,
      allowNull: true
    },
    truck_room_zone_temp : {
      type : 'string',
      required: false,
      allowNull: true
    },
    delivery_status: {
      type: 'string',
      required: false,
      allowNull: true
    },
    api_key: {
      type: 'string',
      required: false,
      allowNull: true
    }
  },

  loadIncomingDeliveries : async (purchaseOrder) => {
    const SQL = `SELECT del.*, IFNULL(pr.upc, '') as upc ` +
      `FROM supplierdelivery AS del LEFT JOIN product AS pr ON del.product_id = pr.id ` +
      `WHERE purchase_order=${purchaseOrder}`;
    const result = await sails.sendNativeQuery(SQL);
    return result.rows;
  }

};

