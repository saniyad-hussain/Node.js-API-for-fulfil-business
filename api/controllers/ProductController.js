/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Object}
   */
    productSearch: async function(req, res) {
        const allowQueryAllOrders = await sails.helpers.checkPermissions(
          req,
          'allowQueryAllOrders'
        );
        if (!allowQueryAllOrders) {
          return res.status(500).json({
            message : 'You are not authorized to access this resource.'
          });
        }

        const limit = req.param('limit');
        const data = await Product.getProductSearch(limit, req.key, req.query.name,
          req.query.fromPrice, req.query.toPrice, req.query.category);
        const output = [];
        const names = {};
        for (const i in data) {
          const row = data[i];
          if (row['is_selectable_meat'] === 0 || row['is_selectable_meat'] === 1) {
            row['is_selectable_meat'] = !!row['is_selectable_meat'];
          }
          if (row['is_selectable_produce'] === 0 ||
              row['is_selectable_produce'] === 1) {
            row['is_selectable_produce'] = !!row['is_selectable_produce'];
          }
          if (names[row.name] !== 1) {
            output.push(row);
            names[row.name] = 1;
          }
        }
        res.json(output);
      },

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
      getAnnotationProducts:async function(req, res) {
        const products = await Product.getAnnotationProducts(req.key);
        res.json(products);
    }
};
