/**
 * QualitycalculationsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const request = require('request');

const self = module.exports = {

  /**
   * Handle the updates of quality metrics by retrieving data from the database,
   * sending the data to an external quality calculation API, and updating the
   * database with the response
   * @param {Req} req
   * @param {Res} res
   * @returns {Object}
   */
  updateQualityCalculations: async function(req, res) {
    // Query the database to get all of the data for computing quality calculations
    const category = req.param('category');
    const itemData = await Qualitycalculations.getAllItemData(category);

    // Perform quality updates using retrieved item data
    if (itemData < 0) {
      res.status(500).json({
        message: 'SQL error occurred getting data'
      });
    }
    await self.getQualityUpdates(itemData, category);

    // Send back success to the automated request
    res.json({'success': true});
  },

  /**
   * Sends all the queried data in itemData (each row is an item)
   * to the respective quality function URL to get a quality update.
   * The function then updates the database for the inventory item if necessary
   * @param {Object} itemData
   * @param {String} category
   * @returns {Promise<void>}
   */
  getQualityUpdates: async function(itemData, category) {
    // Loop through all items and get calculations from quality function API

    for (const row of itemData) {
      // Make an HTTP request to the url
      request.post({
        url: row.url,
        json: row
      }, (error, response, body) => {
        if (error) {
          sails.log.error('Failed in call to quality function api');
        } else {
          sails.log.info(`status code: ${response.statusCode}`);
          sails.log.info(body);

          // Get response and perform one of two options:
          if (category === 'ripeness') {
            // 1. Ripeness: Update the product id in the inventory table for the item
            const newProductId = parseInt(body.product_id, 10);
            if (row.product_id !== newProductId) {
              // TODO(Connor): Perform update in database for the item
            }
          } else if (category === 'shelflife') {
            // 2. Shelf Life: Update the sell by date for the item
            // TODO(Connor): Perform an update in the database for the shelf life
          } else {
            sails.log.info('Unknown quality category');
          }
        }
      });
    }
  }
};
