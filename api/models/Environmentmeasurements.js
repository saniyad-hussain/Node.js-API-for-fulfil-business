/**
 * Environmenttemperaturemeasurements.js
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
    measurement_time: {
      type: 'string',
      required: true
    },
    temperature: {
      type: 'number',
      required: true
    },
    humidity: {
      type: 'number',
      required: false
    }
  }
};
