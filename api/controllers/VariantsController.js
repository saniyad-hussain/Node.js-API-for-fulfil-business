/**
 * VariantsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * return variants
   * @param {Request} req
   * @param {Response} res
   * @param {String} product_id
   */
  getVariants: async function(req, res) {

    const product_id = req.param('product_id');
    const key = req.key;
    if (!product_id && !!key) {

      Variants.find({'is_sellable': true, 'api_key':key}, async (err, variants) => {
        if(err) {
          console.log(err);
          return res.status(500).json({message: 'Something went wrong'});
        }
      return res.status(200).send(variants);
      });

    }else {

      Variants.find({'is_sellable': true, 'api_key':key, id:product_id}, async (err, variants) => {
        if(err) {
          console.log(err);
          return res.status(500).json({message: 'Something went wrong'});
        }
      return res.status(200).send(variants);
      });

    }
  }
};
