/**
 * Inventory.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    product_id: {
      type: 'number',
      required: true
    },
    variant_id: {
      type: 'number',
      allowNull: true,
      required: false
    },
    name: {
      type: 'string',
      allowNull: true,
      required: false
    },
    is_sellable: {
      type: 'boolean',
      required: false,
      allowNull: true
    }
  },

  getSellableProductgrades: async () => {
    const sql = `SELECT id FROM productgrade where is_sellable=true`;
    const result = await sails.sendNativeQuery(sql);
    return result.rows;
  },

  /**
   * @param {Number} inventoryId
   * @param {grade} grade
   * @returns {Array}
   */
  insertProductGrade: async (inventoryId, grade) => {
    const sql = `
      insert into productgrade
        (product_id,name,createdAt)
      values
        ((select product_id from inventory where id=$1 limit 1),$2,now())
    `;
    const result = await sails.sendNativeQuery(sql, [inventoryId, grade]);
    return result.rows;
  }
};
