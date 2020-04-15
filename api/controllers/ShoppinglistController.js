module.exports = {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {String} user_token
   * @param {Number} product_id
   * @returns {Object}
   */
  addItem: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowModifyShopping');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    if (!req.param('user_token')) {
      return res.sendStatus(500);
    }
    if (!req.param('product_id')) {
      return res.sendStatus(500);
    }
    const userId = User.decryptUserKey(req.param('user_token'));
    if (!userId) {
      res.status(500);
      return;
    }
    const cart = await Shoppinglist.create({
      'user_id': userId,
      'product_id': req.param('product_id'),
      'api_key': req.key
    }).fetch();
    res.json(cart);
  },

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {String} user_token
   * @returns {Object}
   */
  getItems: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowGetShopping');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    if (!req.param('user_token')) {
      return res.sendStatus(500);
    }
    const userId = User.decryptUserKey(req.param('user_token'));
    if (!userId) {
      res.sendStatus(500);
      return;
    }
    const list = await Shoppinglist.find({
      where: {user_id: userId, api_key : req.key},
      skip: 0,
      limit: 999,
      sort: 'createdAt DESC'
    });
    const products = [];
    for (const i in list) {
      products.push(list[i].product_id);
    }
    const listOfProducts = await Product.find().where({id: products, api_key : req.key});
    res.json(listOfProducts);
  },

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {String} user_token
   * @param {Number} product_id
   * @returns {Object}
   */
  deleteItem: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowModifyShopping');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    if (!req.param('user_token')) {
      return res.sendStatus(500);
    }
    const userId = User.decryptUserKey(req.param('user_token'));
    if (!userId) {
      res.status(500);
      return;
    }
    const deleted = await Shoppinglist.destroy({
      where: {
        user_id: userId,
        product_id: req.param('product_id'),
        api_key : req.key
      }
    });
    if (deleted === false) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  }
};
