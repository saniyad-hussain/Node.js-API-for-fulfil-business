/**
 * Experiments.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    trainer : {
      type: 'string',
      required: false,
      allowNull: true
    },
    time_started : {
      type: 'string',
      required: false,
      allowNull: true
    },
    time_finished : {
      type: 'string',
      required: false,
      allowNull: true
    },
    storage_base_url : {
      type: 'string',
      required: false,
      allowNull: true
    },
    dataset_id : {
      type: 'number',
      required: true,
      allowNull: false
    },
    notes : {
      type: 'string',
      required: false,
      allowNull: true
    }

  }

};

