/**
 * CustomerOrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const {Parser} = require('json2csv');
const moment = require('moment');

module.exports = {

  /***
   * Re order maintain report with minimum quantity
   * @param {Request} req
   * @param {Response} res
   * @returns {File} attachments csv file
   */
  getReOrderCSV : async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowOrderReport');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    const data = await Order.reOrderReport(req.key);
    const opts = {field : ['product_id', 'product_name', 'min_qty', 'total_qty', 'reorder']};

    const parser = new Parser(opts);
    const csv = parser.parse(data);
    res.attachment('ReOrderReport.csv');
    res.end(csv, 'UTF-8');
  },

  /**
   * Return list of inventory which is got expired now
   * @param {Request} req
   * @param {Response} res
   * @returns {Array}
   */
  getExpiredInventory: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowOrderReport');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    try {
      const data = await Order.expiredInventory(req.key);

      data.forEach(item => {
        item.expires = moment(item.expires).format('dddd, MMMM Do YYYY, h:mm:ss a');
      });

      res.status(200).json(data);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message : 'Something is wrong will process'
      });
    }
  },

  /***
   * Gwt all the product which is under min qty based on algo.
   * @param {Request} req
   * @param {Response} res
   * @returns {File} return csv attachment
   */
  getStockToReorderReport : async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowOrderReport');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    try {
      const data = await Order.stockToReorderReport(req.key);

      const opts = {
        field : [
          'product_id',
          'name',
          'min_qty',
          'lead_time',
          'average_sold_per_day',
          'need_to_order'
        ]
      };

      const parser = new Parser(opts);
      const csv = parser.parse(data);
      res.attachment('ReOrderReport.csv');
      res.end(csv, 'UTF-8');
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message : 'Something is wrong will process'
      });
    }
  }

};

