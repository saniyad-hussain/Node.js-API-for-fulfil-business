/**
 * Defectprogressions.js
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
    defect_label: {
      type: 'string',
      required: true
    },
    severity_score: {
      type: 'number',
      required: true
    },
    filename: {
      type: 'string',
      required: true
    },
    base_cloud_url: {
      type: 'string',
      required: true
    }
  }

};

