/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

const {Volume} = require('memfs');
const fs = require('fs');
const {ufs} = require('unionfs');
const PubSub = require('@google-cloud/pubsub');
const pubsub = new PubSub({
  keyFilename: './config/google-api-key.json',
  projectId: 'fulfil-web'
});

module.exports.bootstrap = async (done) => {

  // By convention, this is a good place to set up fake data during development.

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)

  if (sails.config.environment === 'production') {

    const data = await Apikeylimit.find();
    data.forEach(rec => {
      const apiKey = rec.api_key;
      const totalRequest = rec.total_request;
      const requestCount = rec.request_count;
      const resetInterval = rec.reset_interval;

      ufs.use(fs).use(
        Volume.fromJSON({[`/rateLimit/${apiKey}`]: totalRequest.toString()})
      );
      ufs.use(fs).use(
        Volume.fromJSON({[`/rateLimitRemain/${apiKey}`]: requestCount.toString()})
      );
      ufs.use(fs).use(
        Volume.fromJSON({[`/rateLimitResetInterval/${apiKey}`]: resetInterval.toString()})
      );
    });
  }

  if (sails.config.environment !== 'test') {
    const subscription = pubsub.subscription(sails.config.custom.inductionPubSubTopic);
    const io = sails.io;
    // Create an event handler to handle messages
    const messageHandler = async message => {

      let body = null;
      try {
        body = JSON.parse(`${message.data}`);
      } catch(err) {
        body = `${message.data}`;
      }

      if(
          body && body.to &&
          [
            'dashboard.factory_operator_mobile_ui',
            'factory0.induction_system'
          ].indexOf(body.to) !== -1
      ) {

        const data = {
          id: message.id,
          data: body,
          created: message.publishTime
        };

        io.sockets.emit('induction_message:add', {
          data
        });

        data.ackId = message.ackId;

        await sails.getDatastore('cache').leaseConnection(async (db, proceed) => {
          await db.hset('fulfil_induction', data.id, JSON.stringify(data));
        });

      }
    };

    subscription.on(`message`, messageHandler);
  }

  return done();

};
