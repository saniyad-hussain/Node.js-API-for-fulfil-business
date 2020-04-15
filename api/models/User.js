/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
 const crypto = require('crypto');
     const bcrypt = require('bcrypt-nodejs');
     const algorithm = 'aes-256-cbc';
     const password = 'de9540c0dcd24c435e94d03fa4862b27539b3ca7ae05865d3fd729df33598';
     const salt = 'ubnrl3u15nlqejilkuwcqmw66zu4czwwgpurjeye7qabzy29iobfhebdjv8l1a87';

module.exports = {
  /**
   * Helper method for keeping all of the user id's encrypted
   * The client should never be aware of the database row id.
   * @param {string} unencryptedId
   * @return {string}
   */
  encryptUserId: function(unencryptedId) {
    const text = unencryptedId + salt;
    const cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },

  /**
   * decrypts and desalts the encrypted userKey providing the user id
   * @param {string} userKey
   * @return {string}
   */
  decryptUserKey: function(userKey) {
    try {
      const decipher = crypto.createDecipher(algorithm, password);
      let dec = decipher.update(userKey, 'hex', 'utf8');
      dec += decipher.final('utf8');
      return dec.split(salt).join('');
    } catch(exception) {
      console.error(`Attempted to decrypt a non-encrypted string: ${
        userKey}`, exception);
    }
  },

  attributes: {
    email: {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    first: {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    last: {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    phone: {
    	type: 'string',
    	required: false
    },
    password: {
    	type: 'string',
    	required: false,
      allowNull: true
    },
    phone_verified: {
    	type: 'boolean',
    	defaultsTo: false
    },
    email_verified: {
    	type: 'boolean',
    	defaultsTo: false
    },
    picture: {
      type: 'string',
      required: false,
      allowNull: true
    },
    fb_id: {
      type: 'string',
      required: false,
      allowNull: true
    },
    google_id: {
      type: 'string',
      required: false,
      allowNull: true
    },
    api_key : {
      type: 'string',
      required: true
    }
  },

  /**
   * Return omitted json from object
   * @returns {Object} omitted object
   */
  customToJSON: function() {
    this.id = User.encryptUserId(this.id);
    return _.omit(this, ['password']);
  },

  /**
   * hash password before store into database
   * @param {Object} user
   * @param {Function} cb
   * @returns {*} Callback function
   */
  beforeCreate: function(user, cb) {

    if (!user.password) {
      return cb();
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return cb(err);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return cb(err);
        }
        user.password = hash;
        return cb();
      });
    });
  }

};
