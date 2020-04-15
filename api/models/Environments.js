/**
 * Environments.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    factory_environment_id: {
      type: 'string',
      required: true
    },
    environment_name: {
      type: 'string',
      required: true
    },
    store_id: {
      type: 'number',
      required: false
    }
  }
};
