/**
 * Coretiming.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    command_no: {
      type: 'number',
      required: false
    },
    parent_command_no: {
      type: 'number',
      required: false
    },
    type: {
      type: 'number',
      required: false
    },
    op: {
      type: 'number',
      required: false
    },
    carousel: {
      type: 'number',
      required: false
    },
    bay: {
      type: 'number',
      required: false
    },
    address: {
      type: 'string',
      required: false
    },
    rover: {
      type: 'number',
      required: false
    },
    order_id: {
      type: 'number',
      required: true
    },
    bag_id: {
      type: 'number',
      required: true
    },
    start_time: {
      type: 'number',
      required: false
    },
    finish_time: {
      type: 'number',
      required: false
    },
    duration: {
      type: 'number',
      required: false
    },
    distance: {
      type: 'number',
      required: false
    },
    speed: {
      type: 'number',
      required: false
    },
    acceleration: {
      type: 'number',
      required: false
    },
    deceleration: {
      type: 'number',
      required: false
    }

  }

};

