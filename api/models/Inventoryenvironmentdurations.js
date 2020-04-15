/**
 * Inventoryenvironmentdurations.js
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
    factory_inventory_id: {
      type: 'string',
      required: true
    },
    factory_environment_id: {
      type: 'string',
      required: true
    },
    entered_time: {
      type: 'string',
      required: true
    },
    removed_time: {
      type: 'string',
      required: false
    }
  }
};
