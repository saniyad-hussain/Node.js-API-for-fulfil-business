/**
 * Labelguides.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    group_id: {
      type: 'number',
      required: true
    },
    task: {
      type: 'string',
      required: true
    },
    version: {
      type: 'string',
      required: true
    }
  }
};
