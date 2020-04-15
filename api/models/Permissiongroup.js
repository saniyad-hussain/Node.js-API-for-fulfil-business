/**
 * Permissiongroup.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    group : {
      type: 'string',
      required: true,
      allowNull: false
    }
  },

  getPermissionGroup : async () => {
    const SQL = `SELECT * FROM permissiongroup`;
    const result = await sails.sendNativeQuery(SQL);
    return result.rows;
  }
};

