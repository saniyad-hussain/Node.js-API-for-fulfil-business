/**
 * UpTime.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  datastore : 'mongodbUptimeData',
  tableName : 'UpTime',

  attributes: {
    id: {
      type: 'string',
      columnName: '_id'
    },
    Machine : {
      type: 'string',
      required: true
    },
    Type : {
      type: 'string',
      required: true
    },
    UpTime : {
      type: 'number',
      required: true
    }
  }

};

