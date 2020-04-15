/**
 * FactoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

   getCoreCommands : async (req, res) => {

      const limit = req.param('limit') || 10;

      const data = await CoreCommand.find().limit(limit);
      if (data) {
        res.json(data);
      } else {
        res.status(500).json({
          message : 'record not found !'
        });
      }
    }

};

