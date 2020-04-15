/**
 * WebhookSettingsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  saveWebHookSettings: async (req, res) => {
    try {
      const webHookSettings = req.body.webhooksettings;
      if (
        webHookSettings &&
        webHookSettings.length > 0 &&
        webHookSettings[0].api_key
      ) {
        await WebhookSettings.destroy({api_key: webHookSettings[0].api_key});
        await WebhookSettings.createEach(webHookSettings);
        return res.status(200).send({
          message: `Webhook setting saved successfully.`
        });
      }

      return res.status(500).send({
        message: `Invalid Parameter`
      });
    } catch (error) {
      return res.status(500).send({
        message: `Something went wrong to save webhook settings.`
      });
    }
  }
};
