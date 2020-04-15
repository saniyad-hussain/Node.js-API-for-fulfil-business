/**
 * SimBatch.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  datastore : 'mongodbSimulationResults',
  tableName : 'batch',

  attributes: {

    id: {
      type: 'string',
      columnName: '_id'
    },
    SoftwareVersion : {
      type: 'number',
      required: false
    },
    DateStart : {
      type: 'ref',
      columnType: 'datetime',
      required: false
    },
    DateEnd : {
      type: 'ref',
      columnType: 'datetime',
      required: false
    },
    TotalRunTime : {
      type: 'number',
      required: false
    },
    RunsPerParameter : {
      type: 'number',
      required: false
    },
    BatchParameters : {
      type: 'ref',
      required: false
    }

  }

};

