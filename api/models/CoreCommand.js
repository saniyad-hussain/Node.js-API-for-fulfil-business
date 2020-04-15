/**
 * CoreCommand.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  datastore : 'mongodbFactoryData',
  tableName : 'CoreCommands',

  attributes: {
    id: {
      type: 'string',
      columnName: '_id'
    },
    CommandNo : {
      type: 'number',
      required: false
    },
    ParentCommandNo : {
      type: 'number',
      required: false
    },
    OrderId : {
      type: 'ref',
      required: false
    },
    BagId : {
      type: 'ref',
      required: false
    },
    Type : {
      type: 'number',
      required: false
    },
    Op : {
      type: 'number',
      required: false
    },
    Bay : {
      type: 'number',
      required: false
    },
    ItemId : {
      type: 'number',
      required: false
    },
    Address : {
      type: 'number',
      required: false
    },
    Speed : {
      type: 'number',
      required: false
    },
    Distance : {
      type: 'number',
      required: false
    },
    Acceleration : {
      type: 'number',
      required: false
    },
    Deceleration : {
      type: 'number',
      required: false
    },
    Current : {
      type: 'number',
      required: false
    },
    Distance2 : {
      type: 'number',
      required: false
    },
    SyncRecipe : {
      type: 'boolean',
      required: false
    },
    SyncAxis : {
      type: 'boolean',
      required: false
    },
    Manual : {
      type: 'boolean',
      required: false
    },
    StartTime : {
      type: 'ref',
      columnType: 'datetime',
      required: false
    },
    FinishTime : {
      type: 'ref',
      columnType: 'datetime',
      required: false
    },
    Duration : {
      type: 'number',
      required: false
    }
  }

};

