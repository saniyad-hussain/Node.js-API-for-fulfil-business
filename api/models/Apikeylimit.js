/**
 * Apikeylimit.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    api_key: {
      type: 'string',
      required: true
    },
    request_count : {
      type: 'number',
      required: true
    },
    total_request: {
      type: 'number',
      required: true
    },
    reset_interval : {
      type: 'number',
      required: true
    }

  }

};

