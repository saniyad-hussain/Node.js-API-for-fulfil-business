/**
 * Permissiongrouproutes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    group : {
      type: 'number',
      required: true,
      allowNull: false
    },
    route_Id : {
      type: 'number',
      required: true,
      allowNull: false
    }
  },

  getPermittedRoutes : async (req) => {
    const SQL = `SELECT * FROM permissiongrouproutes WHERE \`group\` = ${req.query.groupId}`;
    const result = await sails.sendNativeQuery(SQL);
    return result.rows;
  },

  deleteGroupRoutes : async (req) => {
    const SQL = `DELETE FROM permissiongrouproutes WHERE \`group\` = ${req.query.groupId}`;
    await sails.sendNativeQuery(SQL);
    return 'Deleted Successfully';
  }

};

