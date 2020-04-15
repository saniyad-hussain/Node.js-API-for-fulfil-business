/**
 * Feedback.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    order_id: {
      type: 'number',
      required: true
    },
    issue: {
      type: 'string',
      required: false
    },
    api_key: {
      type: 'string',
      required: false
    }
  }
};

