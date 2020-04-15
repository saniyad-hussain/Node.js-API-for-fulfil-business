/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

  /**
   * Replaced the sails default create method so that we could create a row,
   * encrypt it, and return the encrypted user id.
   * @param {req} req
   * @param {res} res
   * @returns {Object} return encrypted user detail if it is valid
   */
  createUser: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowCreateUser');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    const createdUser = await User.create({'api_key' : req.key}).fetch();
    res.status(200).json({
      'data': {'id': User.encryptUserId(createdUser.id)}
    });

  },

  /**
   * given an encrypted userId, return the cleansed user object
   * @GET userId
   * @returns {Object} return user detail if it is valid
   * @param {req} req
   * @param {res} res
   */
  getUserByKey: async function(req, res) {

    const allowQueryAllOrders = await sails.helpers.checkPermissions(req, 'allowGetUser');
    if (!allowQueryAllOrders) {
      return res.status(500).json({
        message : 'You are not authorized to access this resource.'
      });
    }

    const userId = req.param('userId');
    if (!userId) {
      res.status(500).json({message: 'User id is not found in request params'});
      return;
    }
    const id = User.decryptUserKey(userId);
    if (!id) {
      res.status(500).json({message : 'User id is not decrypted '});
      return;
    }
    const user = await User.findOne({'id': id, 'api_key' : req.key});
    if (!user) {
      res.sendStatus(500);
      const logger = await sails.helpers.logger('getUserByKey', `${'no user '+
          'rows were found for user id: '}${ id}`);
      sails.log(logger);
      return;
    }
    delete user.password; // don't send the password over the wire ever
    res.status(200).json({'data': user});
  }
};
