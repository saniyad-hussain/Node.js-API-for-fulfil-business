/**
 * WebhookSettings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    webhook_url: {
      type: 'string',
      required: false,
      allowNull: false
    },

    webhook_event: {
      type: 'string',
      required: true,
      allowNull: false
    },

    api_key: {
      type: 'string',
      required: true,
      allowNull: false
    }
  }
};
