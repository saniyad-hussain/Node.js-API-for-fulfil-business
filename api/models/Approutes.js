/**
 * Approutes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    pagePath : {
      type: 'string',
      required: true,
      allowNull: false
    }
  },

  getRoutes : async () => {
    const SQL = `SELECT * FROM approutes`;
    const result = await sails.sendNativeQuery(SQL);
    return result.rows;
  }

};

