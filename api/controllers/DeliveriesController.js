/**
 * DeliveriesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

   /**
    *
    * @param {Object} data
    * @param {Response} res
    */
   loadIncomingDeliveries:async function(data, res) {
        const orders = await SupplierDelivery.loadIncomingDeliveries(data.query.purchaseOrder);
        res.json(orders);
    },

    /**
     * Update temp information by purchase order
     * @param {Request} req
     * @param {Response} res
     * @get {String} orderId
     * @get {String} truck_cold_zone_temp
     * @get {String} truck_freezer_zone_temp
     * @get {String} truck_room_zone_temp
     * @returns {Promise<*>}
    */
    updateTempInfo: async function(req, res) {
      const orderId = req.param('order_id');
      const truck_cold_zone_temp = req.param('truck_cold_zone_temp');
      const truck_freezer_zone_temp = req.param('truck_freezer_zone_temp');
      const truck_room_zone_temp = req.param('truck_room_zone_temp');

      if (!orderId) {
        return res.status(500).json({message: 'order Id is required !'});
      }

      try {

        await SupplierDelivery.update({purchase_order : orderId}).set({
          truck_cold_zone_temp,
          truck_freezer_zone_temp,
          truck_room_zone_temp
        });

        res.status(200).json({
          message : 'Temp info updated successfully !'
        });

      } catch (e) {
        res.status(500).json({
          message : 'Something is wrong !',
          err : e.message
        });
      }
    }

};

