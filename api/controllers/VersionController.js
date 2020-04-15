/**
 * VersionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
const ip = require('ip');
const path = require('path');
module.exports = {
  index: async (req, res) => {
    const filePath = path.join(__dirname, `../../assets/version.txt`);
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          throw err;
        }
        const log = `${data}. Server is running in ${ip.address()}`;
        res.send(log);
      });
    } else {
      res.status(500).send({
        message: `path is not exists. Server is running in ${ip.address()}`
      });
    }
  }
};
