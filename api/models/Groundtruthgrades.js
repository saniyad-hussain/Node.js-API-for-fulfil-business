/**
 * Groundtruthgrades.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    operator_id: {
      type: 'number',
      required: true
    },
    inventory_id: {
      type: 'number',
      required: false
    },
    time_graded: {
      type: 'string',
      required: true
    },
    grade: {
      type: 'string',
      required: true
    },
    method: {
      type: 'string',
      required: false
    },
    guide_version: {
      type: 'number',
      required: false
    },
    uncertain: {
      type: 'boolean',
      required: false
    },
    uuid: {
      type: 'string',
      required: false
    }
  },

  /**
   * @param {Object} params
   */
  insertGroundTruthGrades: async (params) => {
    const SQL = `INSERT INTO groundtruthgrades (operator_id, time_graded, grade, method, ` +
      `guide_version, uncertain, inventory_id, createdAt, updatedAt) VALUES` +
      `(${params.operator_id}, '${params.time_graded}', '${params.grade}', '${params.method}', ` +
      `${params.guide_version}, ${params.uncertain}, ${params.inventory_id}, ` +
      `${new Date().getTime()}, ${new Date().getTime()})`;
    const result = await sails.sendNativeQuery(SQL);
    const SQL1 = `SELECT * FROM groundtruthgrades WHERE id=${result.insertId}`;
    const result1 = await sails.sendNativeQuery(SQL1);
    return result1.rows[0];
  },

  /**
   * @param {Number} invId
   */
  getAllGradesByInv: async (invId) => {
    const SQL = `SELECT grade from groundtruthgrades where inventory_id = ${invId}`;
    const result = await sails.sendNativeQuery(SQL);
    const results = [];
    for (const item of result.rows) {
      results.push(item.grade);
    }
    return results;
  }
};
