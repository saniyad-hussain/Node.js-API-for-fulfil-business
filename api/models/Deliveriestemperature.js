/**
 * Deliveriestemperature.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    box_id: {
      type: 'string',
      required: false
    },
    date_harvested: {
      type: 'string',
      columnType: 'datetime',
      required: false
    },
    temp_night_before_harvest: {
      type: 'string',
      required: false
    },
    temp_at_time_of_harvest: {
      type: 'string',
      required: false
    },
    time_in_warehouse: {
      type: 'string',
      columnType: 'datetime',
      required: false
    },
    temp_in_warehouse: {
      type: 'string',
      required: false
    },
    temp_delivery_truck: {
      type: 'string',
      required: false
    },
    species: {
      type: 'string',
      required: false
    },
    api_key: {
      type: 'string',
      required: false
    }
  }

};

