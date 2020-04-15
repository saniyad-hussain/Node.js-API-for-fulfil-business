const Pubsub = require('@google-cloud/pubsub');
/**
 * GroundtruthgradesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const self = (module.exports = {
  /**
   * @param {Object} data
   * @param {Response} res
   */
  createGroundTruthGrades: async function(data, res) {
    const params = data.body;
    const gradeData = await Groundtruthgrades.insertGroundTruthGrades(params);
    self.getAllGradesByInv(gradeData.inventory_id).then(async grades => {
      self.doGradesMeetCriteria(grades).then(async criteria => {
        if (criteria !== false) {
          const inventory = await Inventory.find({
            where: {
              id: gradeData.inventory_id
            },
            limit: 1
          });
          if (inventory && inventory.length > 0) {
            let calculatedGrade = 'Ungraded';
            if (criteria > 0 && criteria <= 2) {
              calculatedGrade = 'Full Price';
            } else if (criteria == 3) {
              calculatedGrade = 'Discount';
            } else if (criteria > 3) {
              calculatedGrade = 'Discard';
            }
            await Productgrade.insertProductGrade(
              gradeData.inventory_id,
              calculatedGrade
            );
            self.publishMessageToFactory(
              gradeData.inventory_id,
              calculatedGrade,
              inventory[0].factory_inventory_id
            );
          }
        }
      });
    });
    res.json(gradeData);
  },

  /**
   * @param {Number} invId
   */
  getAllGradesByInv: async function(invId) {
    const grades = await Groundtruthgrades.getAllGradesByInv(invId);
    return grades;
  },

  /**
   * @param {Number} invId
   */
  getProductDetailByInventoryId: async function(invId) {
    const grades = await Inventory.getAllGradesByInv(invId);
    return grades;
  },

  /**
   * @param {Object} grades
   */
  doGradesMeetCriteria: async grades => {
    if (grades.length < 2) {
      return false;
    }
    const sum = grades.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    return Math.floor((sum / grades.length) || 0);
  },

  /**
   * @param {Number} invId
   * @param {gradeId} gradeId
   * @param {factoryInventoryId} factoryInventoryId
   *
   */
  publishMessageToFactory: async (invId, gradeId, factoryInventoryId) => {
    const pubsub = new Pubsub({
      keyFilename: './config/google-api-key.json',
      projectId: 'fulfil-web'
    });
    const topic = 'INDUCTION';
    const packet = {
      to: 'factory0.inventory_handler',
      from: 'api0',
      status: 'created',
      type: 'item_was_graded',
      body: {
        factory_inventory_id: factoryInventoryId,
        grade_id: gradeId,
        new_product_id: null,
        next_manual_inspection_schedule: Date.parse(
          new Date(new Date().getTime() + 60 * 60 * 24 * 1000)
        )
      }
    };
    const dataBuffer = Buffer.from(JSON.stringify(packet));
    pubsub
      .topic(topic)
      .publisher()
      .publish(dataBuffer)
      .then(msg => {});
  }
});
