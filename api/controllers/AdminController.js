/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');
const md5 = require('md5');

module.exports = {
  /**
   * Login to admin dashboard
   * @param {Request} req
   * @param {Response} res
   * @returns {Object}
   */
  login: async (req, res) => {
    const username = req.param('username');
    const password = req.param('password');

    if (!username) {
      return res.status(500).json({message: 'username is required !'});
    }

    if (!password) {
      return res.status(500).json({message: 'password is required !'});
    }

    Adminuser.findOne({username}, (err, user) => {
      if (err) {
        return res.status(500).json({message: 'Something is wrong'});
      }

      if (!user) {
        return res.status(500).json({
          message: 'User is not exists please register and try again'
        });
      }

      const isValid = md5(`${password}sanjay`) === user.password;

      if (!isValid) {
        return res.status(500).json({
          message: 'Username or password may be wrong or user not exists.'
        });
      }

      const data = {
        id: user.id,
        email: user.email,
        username: user.username,
        issued: new Date().getTime(),
        api_key: user.api_key,
        role: user.role,
        user: 'ADMIN'
      };
      const token = jwt.sign({data}, sails.config.custom.tokenSecret);

      res.status(200).json({
        message: 'Logged In Successfully',
        token,
        data: {
          api_key: user.api_key,
          secret_key: user.secret_key
        }
      });
    });
  },

  /**
   * Ger permission for admin dashboard pages
   * @param {Request} req
   * @param {Response} res
   */
  permission: async (req, res) => {
    const token = req.param('token') || req.headers['token'];
    const decoded = await jwt.verify(token, sails.config.custom.tokenSecret);

    const userId = decoded.data.id;

    const rows = await Adminuser.getUserPermission(userId);

    res.status(200).json({
      data: rows
    });
  },

  /**
   * Get Only users and id
   * @param {Request} req
   * @param {Response} res
   */
  users: async (req, res) => {
    const rows = await Adminuser.getUsers();
    res.json(rows);
  },

  /**
   * Get Permission groups
   * @param {Request} req
   * @param {Response} res
   */
  permissionGroups: async (req, res) => {
    const rows = await Permissiongroup.getPermissionGroup();
    res.json(rows);
  },

  /**
   * Update Permission groups
   * @param {Request} req
   * @param {Response} res
   */
  updateUserPermission: async (req, res) => {
    const allowUpdateUserPermission = await sails.helpers.checkPermissions(
      req,
      'allowUpdateUserPermission'
    );
    if (!allowUpdateUserPermission) {
      return res.status(500).json({
        message: 'You are not authorized to access this resource.'
      });
    } else {
      const rows = await Adminuserpermission.updateUserPermission(req);
      res.json(rows);
    }
  },

  /**
   * Get all routes
   * @param {Request} req
   * @param {Response} res
   */
  getAllRoutes: async (req, res) => {
    const rows = await Approutes.getRoutes();
    res.json(rows);
  },

  /**
   * Get all permitted routes of group
   * @param {Request} req
   * @param {Response} res
   */
  getPermittedRoutesById: async (req, res) => {
    const rows = await Permissiongrouproutes.getPermittedRoutes(req);
    res.json(rows);
  },

  /**
   * Delete All permitted routes of group
   * @param {Request} req
   * @param {Response} res
   */
  deleteGroupRoutes: async (req, res) => {
    const allowDeleteGroupRoutes = await sails.helpers.checkPermissions(
      req,
      'allowDeleteGroupRoutes'
    );
    if (!allowDeleteGroupRoutes) {
      return res.status(500).json({
        message: 'You are not authorized to access this resource.'
      });
    } else {
      const rows = await Permissiongrouproutes.deleteGroupRoutes(req);
      res.json(rows);
    }
  }
};
