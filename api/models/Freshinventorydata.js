/**
 * Freshinventorydata.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    inventory_id: {
      type: 'number',
      required: true
    },
    harvest_date: {
      type: 'string',
      required: false
    },
    season: {
      type: 'string',
      required: false
    },
    variety: {
      type: 'string',
      required: false
    },
    supplier_id: {
      type: 'number',
      required: false
    },
    condition_date: {
      type: 'string',
      required: false
    },
    color: {
      type: 'string',
      required: false
    }
  }
};
