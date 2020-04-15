/**
 * Progressionmodels.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    guide_id: {
      type: 'number',
      required: true
    },
    base_cloud_url: {
      type: 'string',
      required: true
    },
    filename: {
      type: 'string',
      required: true
    },
    progression_version: {
      type: 'number',
      required: true
    },
    date_added: {
      type: 'string',
      required: true
    }
  }
};
