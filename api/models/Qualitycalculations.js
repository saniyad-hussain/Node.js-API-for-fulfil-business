/**
 * Qualitycalculations.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    product_id: {
      type: 'number',
      required: true
    },
    category: {
      type: 'string',
      required: true
    },
    url: {
      type: 'string',
      required: true
    }
  },

  /**
   * Get all quality data for each item in inventory that fall in the quality category specified
   * @param {String} category
   */
  getAllItemData: async function(category) {
    const SQL =
      `SELECT inv.product_id,
       qc.url,
       fresh.*,
       GROUP_CONCAT(m.temperature) AS temperature_measurements, GROUP_CONCAT(m.measurement_time)
       AS temperature_measurement_times FROM inventory AS inv
       JOIN qualitycalculations AS qc ON qc.product_id=inv.product_id AND qc.category=$1
       JOIN freshinventorydata AS fresh ON fresh.inventory_id=inv.id
       JOIN inventoryenvironmentdurations AS env ON env.inventory_id=inv.id
       JOIN environmentmeasurements AS m ON m.factory_environment_id=env.factory_environment_id
       WHERE m.measurement_time BETWEEN env.entered_time AND env.removed_time
       GROUP BY fresh.id, qc.product_id, qc.url;`;
    const result = await sails.sendNativeQuery(SQL, [category]);
    return result.rows;
  }

};
