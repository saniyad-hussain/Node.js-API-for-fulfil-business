/**
 * Adminuser.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const crypto = require('crypto');
// const bcrypt = require('bcrypt-nodejs');
const algorithm = 'aes-256-cbc';
const password =
  'de9540c0dcd24c435e94d03fa4862b27539b3ca7ae05865d3fd729df33598';
const salt = 'ubnrl3u15nlqejilkuwcqmw66zu4czwwgpurjeye7qabzy29iobfhebdjv8l1a87';
const md5 = require('md5');

module.exports = {
  /**
   * Helper method for keeping all of the user id's encrypted
   * The client should never be aware of the database row id.
   * @param {string} unencryptedId
   * @return {string}
   */
  encryptUserId: unencryptedId => {
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
  decryptUserKey: userKey => {
    try {
      const decipher = crypto.createDecipher(algorithm, password);
      let dec = decipher.update(userKey, 'hex', 'utf8');
      dec += decipher.final('utf8');
      return dec.split(salt).join('');
    } catch (exception) {
      console.error(
        `Attempted to decrypt a non-encrypted string: ${userKey}`,
        exception
      );
    }
  },

  attributes: {
    email: {
      type: 'string',
      required: true,
      allowNull: false
    },
    password: {
      type: 'string',
      required: true,
      allowNull: false
    },
    username: {
      type: 'string',
      required: true,
      allowNull: false
    },
    role: {
      type: 'string',
      required: false,
      allowNull: true
    },
    api_key: {
      type: 'string',
      required: true,
      allowNull: false
    },
    secret_key: {
      type: 'string',
      required: true,
      allowNull: false
    }
  },

  customToJSON: () => {
    this.id = Adminuser.encryptUserId(this.id);
    return _.omit(this, ['password']);
  },

  beforeCreate: (user, cb) => {
    if (!user.password) {
      return cb();
    }

    user.password = md5(`${user.password}sanjay`);

    return cb();
  },

  getUserPermission: async userId => {
    const SQL = `SELECT
                    d.pagePath
               FROM
                    adminuserpermission a,
                    permissiongroup b,
                    permissiongrouproutes c,
                    approutes d
                WHERE
                    a.user_id = $1
                        AND a.permission_group = b.id
                        AND b.id = c.group
                        AND c.route_id = d.id`;

    const result = await sails.sendNativeQuery(SQL, [userId]);
    return result.rows;
  },

  getUsers: async () => {
    const SQL =
      `SELECT u.id as userid, u.username, up.permission_group, pg.group ` +
      `FROM adminuser as u LEFT JOIN adminuserpermission as up ON up.user_id = u.id ` +
      `LEFT JOIN permissiongroup as pg ON pg.id = up.permission_group`;
    const result = await sails.sendNativeQuery(SQL);
    return result.rows;
  }
};
