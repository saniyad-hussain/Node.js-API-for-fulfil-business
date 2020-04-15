/**
 * DeliveryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const request = require('request-promise');

const self = (module.exports = {
  /**
   * Webhook for postmates delivery status update realtime
   */
  getPostmatesDeliveryStatus: async (req, res) => {
    const body = req.body;
    const io = sails.io;

    // Initialize socket if getting courier update from postmates.
    if (body.kind === 'event.courier_update') {
      io.sockets.emit('postmatesStatus', {
        id: body.id,
        deliveryId: body.delivery_id,
        status: body.data.status,
        location: {...body.location}
      });
    }
    if (
      body.data.status === 'delivered' ||
      body.data.status === 'canceled' ||
      body.data.status === 'pickup'
    ) {
      let webhookURL = '';
      const getOrderDetails = await EnduserDelivery.find({
        delivery_id: body.delivery_id
      });
      const data = {
        deliveryId: body.delivery_id,
        status: body.data.status
      };

      const apiKey =
        getOrderDetails.length > 0 ? getOrderDetails[0].api_key : '';
      if (body.data.status === 'delivered' && apiKey) {
        const webHookSettings = await WebhookSettings.find({
          where: {webhook_event: 'ORDER_DELIVERED'},
          select: ['webhook_url']
        });
        webhookURL =
          webHookSettings.length > 0 ? webHookSettings[0].webhook_url : '';
      } else if (body.data.status === 'canceled' && apiKey) {
        const webHookSettings = await WebhookSettings.find({
          where: {webhook_event: 'ORDER_CANCELED'},
          select: ['webhook_url']
        });
        webhookURL =
          webHookSettings.length > 0 ? webHookSettings[0].webhook_url : '';
      } else if (body.data.status === 'pickup' && apiKey) {
        const webHookSettings = await WebhookSettings.find({
          where: {webhook_event: 'ORDER_PICKED_UP'},
          select: ['webhook_url']
        });
        webhookURL =
          webHookSettings.length > 0 ? webHookSettings[0].webhook_url : '';
      }
      if (webhookURL) {
        self.sendAPIRequest(webhookURL, data);
      }
    }

    res.sendStatus(200);
  },

  /**
   * send HTTP request to passed url with data.
   * @param {String} url
   * @param {Object} data
   */
  sendAPIRequest: async (url, data) => {
    request({
      method: 'POST',
      uri: url,
      json: true,
      body: {
        ...data
      }
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.statusCode;
      });
  }
});
