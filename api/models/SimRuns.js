/**
 * SimRuns.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  datastore : 'mongodbSimulationResults',
  tableName : 'runs',

  attributes: {

    id: {
      type: 'string',
      columnName: '_id'
    },
    SetId : {
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
    RunTime : {
      type: 'number',
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
    RoversInQueue : {
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
    NumberOrders : {
      type: 'number',
      required: false
    },
    NumberPicks : {
      type: 'number',
      required: false
    },
    AverageItems : {
      type: 'number',
      required: false
    }

  }

};

