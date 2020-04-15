/**
 * CoretimingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * Create coretiming and return created data
   * @param {Request} req
   * @param {Response} res
   * @Get command_no
   * @Get parent_command_no
   * @Get type
   * @Get op
   * @Get carousel
   * @Get bay
   * @Get address
   * @Get rover
   * @Get order_id
   * @Get bag_id
   * @Get start_time
   * @Get finish_time
   * @Get duration
   * @Get distance
   * @Get speed
   * @Get acceleration
   * @Get deceleration
   * @returns {Object}
   */
  addCoretiming: async (req, res) => {

    if (req.param('order_id') === null) {
      return res.sendStatus(500);
    }

    if (req.param('bag_id') === null) {
      return res.sendStatus(500);
    }

    const invInputs = await sails.helpers.validateCreationParams(
      Coretiming,
      req.allParams()
    );

    const newCoretiming = await Coretiming.create(invInputs).fetch();
    res.json(newCoretiming);

  },

  getAll : async (req, res) => {

    const limit = req.param('limit');

    let SQL = 'select * from coretiming';
    SQL += limit ? ` LIMIT ${limit}` : '';

    sails.sendNativeQuery(SQL).then(data => {
      res.json(data.rows);
    }).catch((err) => {
      res.status(500).json(err);
    });

  }


};

