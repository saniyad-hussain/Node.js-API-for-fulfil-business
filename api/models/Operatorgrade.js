/**
 * Operatorgrade.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    groundtruthgrade_id: {
      type: 'number',
      required: true
    },
    current_operator_id: {
      type: 'number',
      required: false
    },
    operator_id: {
      type: 'number',
      required: false
    },
    inventory_id: {
      type: 'number',
      required: false
    }
  }
};
