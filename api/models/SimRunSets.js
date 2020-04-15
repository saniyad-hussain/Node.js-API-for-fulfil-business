/**
 * SimRunSets.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  datastore : 'mongodbSimulationResults',
  tableName : 'run-sets',

  attributes: {

    id: {
      type: 'string',
      columnName: '_id'
    },
    BatchId : {
      type: 'ref',
      required: true
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
    Parameters : {
      type: 'ref',
      required: false
    },
    AverageOrderTime : {
      type: 'number',
      required: false
    },
    MaxOrderTime : {
      type: 'number',
      required: false
    },
    MinOrderTime : {
      type: 'number',
      required: false
    },
    AverageTravelTime : {
      type: 'number',
      required: false
    },
    AverageWaitTime : {
      type: 'number',
      required: false
    },
    AverageFulfillTime : {
      type: 'number',
      required: false
    },
    AverageRoversinQueue : {
      type: 'ref',
      required: false
    },
    MaxRoversInQueue : {
      type: 'number',
      required: false
    },
    MaxRoversUsed : {
      type: 'ref',
      required: false
    },
    AvgStationIdleTimeMin : {
      type: 'ref',
      required: false
    },
    AverageItems : {
      type: 'number',
      required: false
    },
    NumberRuns : {
      type: 'number',
      required: false
    }

  }

};

