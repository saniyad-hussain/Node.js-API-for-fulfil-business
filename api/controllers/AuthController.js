const passport = require('passport');
    const config = require('../../config/env/production').custom;
    const jwt = require('jsonwebtoken');
/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * register local user, verify exists or not and return user info
   * @param {Request} req
   * @param {Response} res
   * @param {String} email
   * @param {String} password
   * @param {String} first_name
   * @param {String} last_name
   * @param {String} user_id
   * @returns {Object}
   */
  register: async function(req, res) {

    if (!req.param('email')) {
      return res.status(500).json({message: 'email is required !'});
    }

    if (!req.param('password')) {
      return res.status(500).json({message: 'password is required !'});
    }

    if (!req.param('first_name')) {
      return res.status(500).json({message: 'first name is required !'});
    }

    if (!req.param('last_name')) {
      return res.status(500).json({message: 'last name is required !'});
    }

    const params = {
      email: req.param('email'),
      password: req.param('password'),
      first: req.param('first_name'),
      last: req.param('last_name'),
      api_key: req.key
    };

    const userID = User.decryptUserKey(req.param('user_id'));

    if (!userID) {
      return res.status(500).json({message: 'user id not valid !'});
    }

    // check email is exists or not if so then out else process
    User.findOne({email: params.email, api_key: req.key}, async (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({message: 'Something went wrong'});
      }

      if (!user) {
        // check user record is exists , if so then check for email field and update it
        // else create new record on each fail case
        User.findOne({id: userID, api_key: req.key}, async (err, userInner) => {
          if (err) {
            console.log(err);
            return res.status(500).json({message: 'Something went wrong'});
          }
            if (userInner) {
              if (!userInner.email) {
                const user = await User.update({id: userID}).set(params).fetch();
                res.json(user);
              } else {
                const user = await User.create(params).fetch();
                res.json(user);
              }
            } else {
              const user = await User.create(params).fetch();
              res.json(user);
            }
        });
      } else {
        console.log('User already exists');
        res.status(500).json({message: 'User already exists'});
      }
    });

  },

  /**
   * Login using passport.js local strategy
   * @param {Request} req
   * @param {Response} res
   * @param {String} email
   * @param {String} password
   * @returns {Object} return user info or error detail if any
   */
  login: async function(req, res) {

    if (!req.param('email')) {
      return res.status(500).json({message: 'email is required !'});
    }

    if (!req.param('password')) {
      return res.status(500).json({message: 'password is required !'});
    }

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      if (user) {
        res.json(user);
      } else {
        res.status(500).json(info);
      }
    })(req, res);
  },

  /**
   * logout from passport auth login and redirect to root of application
   * @param {Request} req
   * @param {Response} res
   */
  logout: async function(req, res) {
    req.logout();
    res.json({message: 'Logout successfully'});
  },

  /**
   * Login using passport facebook auth strategy
   * @param {Request} req
   * @param {Response} res
   * @param {String} user_id
   */
  facebookAuth: async function(req, res) {
    passport.authenticate('facebook', {
      scope :['email'],
      state : req.param('user_id')
    }, null)(req, res);
  },

  /**
   * Return profile(scope) info after successful facebook auth and callback send to this action
   * @param {Request} req
   * @param {Response} res
   */
  facebookCallback: async function(req, res) {
    passport.authenticate('facebook', (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.cookie('authUser', JSON.stringify(user));
      res.cookie('provider', 'facebook');
      res.redirect(`${config.appUrl}/#/login`);
    })(req, res);
  },

  /**
  * Login using passport google auth strategy
   * @param {Request} req
   * @param {Response} res
   * @param {String} user_id
  */
  googleAuth: async function(req, res) {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      state : req.param('user_id')
    }, null)(req, res);
  },

  /**
  * Return profile(scope) info after successful google auth and callback send to this action
  * @param {Request} req
  * @param {Response} res
  */
  googleCallback: async function(req, res) {
    passport.authenticate('google', (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.cookie('authUser', JSON.stringify(user));
      res.cookie('provider', 'google');
      res.redirect(`${config.appUrl}/#/login`);
    })(req, res);
  },


  /**
   * Check users for given auth callback response email id and update/create user accordingly.
   * @param {Request} req
   * @param {Response} res
   * @param {String} email
   * @param {String} first_name
   * @param {String} last_name
   * @param {String} provider
   * @param {String} providerUserId
   * @param {String} user_id
   * @returns {Object}
   */
  registerUserByProvider: async function(req, res) {

    if (!req.param('email')) {
      return res.status(500).json({message: 'email is required !'});
    }

    if (!req.param('provider')) {
      return res.status(500).json({message: 'provider is required !'});
    }

    if (!req.param('providerUserId')) {
      return res.status(500).json({message: 'provider user id is required !'});
    }

    const userID = User.decryptUserKey(req.param('user_id'));
    const provider = req.param('provider');
    const providerUserId = req.param('providerUserId');

    const authJSON = {
      [provider === 'google' ? 'google_id' : 'fb_id']: providerUserId,
      picture: req.param('picture')
    };

    const params = {
      email: req.param('email'),
      first: req.param('first_name'),
      last: req.param('last_name'),
      ...authJSON
    };

    // check email is register before or not if so then update existing record with fb/google id
    User.findOne({email : params.email}, async (err, user) => {
      if (err) {
        return res.status(500).json({message: 'Something went wrong'});
      }

      if (user) {
        const user = await User.update({email : params.email}).set(authJSON).fetch();
        res.json(user);
      } else {

        // check guest user is exists if so then update their fields
        // with fb/google profile else create new user with fb/google profile
        User.findOne({id: userID}, async (err, userInner) => {
          if (err) {
            return res.status(500).json({message: 'Something went wrong'});
          }
          if (userInner) {
            const user = await User.update({id: userID, api_key: req.key}).set(params).fetch();
            res.json(user);
          } else {
            const user = await User.create(params).fetch();
            res.json(user);
          }
        });
      }
    });

  },

  /**
   * @param {Request} req
   * @param {Response} res
   * @header@param {String} secret
   * @header {String} key
   * @returns {Object}
   */
  getToken: function(req, res) {
    const secret = req.param('secret') || req.header('secret');
    if (!secret) {
      sails.helpers.logger('error', 'attempted to request auth token without' +
          ' providing a valid secret token.');
      return res.status(500).json({message: 'secret required'});
    }
    const isValid = _.find(sails.config.apiPermission.config, {secret});
    if (!isValid || !isValid.secret || !isValid.secret === req.config.secret) {
      return res.status(403).json({message: 'invalid secret'});
    }
    const data = req.config;
    data.user = 'USER';
    data.issued = new Date().getTime();
    const token = jwt.sign({data}, sails.config.custom.tokenSecret);
    res.json({token});
  }
};
