/**
 * Adminuserpermission.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user_id : {
      type: 'number',
      required: true,
      allowNull: false
    },
    permission_group : {
      type: 'number',
      required: true,
      allowNull: false
    }
  },

  updateUserPermission : async (req) => {
    const SQL = `SELECT * FROM adminuserpermission where user_id=${req.body.user_id}`;
    const result = await sails.sendNativeQuery(SQL);
    let SQL1 = '';
    if (result.rows.length > 0) {
      SQL1 = `UPDATE adminuserpermission SET permission_group=` +
        `${req.body.permission_group} WHERE user_id=${req.body.user_id}`;
      await sails.sendNativeQuery(SQL1);
      return 'Permission Group Update Successfully';
    } else {
      SQL1 = `INSERT INTO adminuserpermission (user_id, permission_group) ` +
        `VALUES (${req.body.user_id}, ${req.body.permission_group}')`;
      await sails.sendNativeQuery(SQL1);
      return 'Permission Group Insert Successfully';
    }
  }
};

