/**
 * Defectgrade.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    image_id: {
      type: 'number',
      required: true
    },
    operator_id: {
      type: 'number',
      required: true
    },
    defect_label: {
      type: 'string',
      required: true
    },
    severity_score: {
      type: 'number',
      required: false
    },
    x1: {
      type: 'number',
      required: false
    },
    y1: {
      type: 'number',
      required: false
    },
    x2: {
      type: 'number',
      required: false
    },
    y2: {
      type: 'number',
      required: false
    },
    job_id: {
      type: 'number',
      required: true
    },
    guide_id: {
      type: 'number',
      required: true
    },
    time_created: {
      type: 'string',
      required: true
    }
  }
};
