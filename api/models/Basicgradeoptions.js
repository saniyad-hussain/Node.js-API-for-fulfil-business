/**
 * Basicgradeoptions.js
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
    button_text: {
      type: 'string',
      required: true
    },
    numeric_code: {
      type: 'number',
      required: true
    },
    hover_text: {
      type: 'string',
      required: true
    }
  }
};
