/**
 * InductionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const request = require('request-promise');
const PubSub = require('@google-cloud/pubsub');
const pubsub = new PubSub({
  keyFilename: './config/google-api-key.json',
  projectId: 'fulfil-web'
});

module.exports = {

  subscribeInductionMessages : async function(req, res) {
    sails.getDatastore('cache').leaseConnection((db, proceed) => {
      db.hgetall("fulfil_induction", (err, cachedData) => {
        if (err) { return proceed(err); }
        let data = [];
        if(cachedData) {
          Object.keys(cachedData).forEach((key) => {
              const cachedDetailData = JSON.parse(cachedData[key]);

              let body = null;
              try {
                body = JSON.parse(cachedDetailData.data);
              } catch(err) {
                body = cachedDetailData.data;
              }

              const obj = {
                 id  : cachedDetailData.id,
                 data : body,
                 created : cachedDetailData.created,
              };
              data.push(obj);
          });
        }
        return proceed(undefined, data);
      });
    }).exec((err, data) => {
      if (err) { return res.serverError(err); }
      return res.json(data);
    });
  },

  getMessageInfo : async function(req, res) {
    const messageId = req.param('message_id');
    if(!messageId) {
      return res.status(500).json({
        message : 'message id not found'
      });
    }
    sails.getDatastore('cache').leaseConnection((db, proceed) => {
      db.hget("fulfil_induction", messageId ,(err, cachedData) => {
        if (err) { return proceed(err); }
        const cachedDetailData = JSON.parse(cachedData);
        let body = null;
        try {
          body = JSON.parse(cachedDetailData.data);
        } catch(err) {
          body = cachedDetailData.data;
        }
        const obj = {
          id  : cachedDetailData.id,
          data : body,
          created : cachedDetailData.publishTime
        };
        return proceed(undefined, obj);
      });
    }).exec((err, data) => {
      if (err) { return res.serverError(err); }
      return res.json(data);
    });
  },

  sendAcknowledgement : async function(req, res) {
    const messageId = req.param('message_id');
    if(!messageId) {
      return res.status(500).json({
        message : 'message id not found'
      });
    }

    sails.getDatastore('cache').leaseConnection((db, proceed) => {
      db.hget("fulfil_induction", messageId ,(err, cachedData) => {
        if (err) { return proceed(err); }
        if(!cachedData) {
          return proceed('Message is not exists!');
        }
        const cachedDetailData = JSON.parse(cachedData);
        if(cachedDetailData && !cachedDetailData.ackId) {
          return proceed('ackId is not exists!');
        }
        request({
          'method': 'POST',
          'uri': 'https://www.googleapis.com/oauth2/v4/token',
          'json': true,
          'body': {
            'client_secret': 'SvMeG-XQUsMBz0pKP2OiAE1I',
            'grant_type': 'refresh_token',
            'refresh_token': '1/ja1wqVsbHB4jKVma6o3lZjy0GwUwKTgyl-vekVvYS4I',
            'client_id':
              '45591008103-alm6on1qu1apr5airh65rni0scf9qad8.apps.googleusercontent.com'
          }
        }).then((response) => {
          const accessToken = response.access_token;
          request({
            'method': 'POST',
            'uri': `https://pubsub.googleapis.com/v1/projects/fulfil-web/subscriptions/` +
              `${sails.config.custom.inductionPubSubTopic}:acknowledge?access_token=${accessToken}`,
            'json': true,
            'body': {
              "ackIds": [
                cachedDetailData.ackId
              ]
            }
          }).then((response) => {
            db.hdel("fulfil_induction", cachedDetailData.id ,(err) => {
              if(err) {
                return proceed(err);
              }
              return proceed(undefined, response);
            });
          }).catch(err => {
            return proceed(err);
          });
        }).catch(err => {
          return proceed(err);
        });
      });
    }).exec((err, data) => {
      if (err) { return res.serverError(err); }
      return res.json(data);
    });
  },

  sendAcknowledgeForMessage : async function(req, res) {
    const messageId = req.param('message_id');
    const askType = req.param('ask_type');
    if(!messageId) {
      return res.status(500).json({
        message : 'message id not found'
      });
    }
    if(!askType) {
      return res.status(500).json({
        message : 'ask type is  not found'
      });
    }

    sails.getDatastore('cache').leaseConnection((db, proceed) => {
      db.hget("fulfil_induction", messageId ,(err, cachedData) => {
        if (err) { return proceed(err); }
        if(!cachedData) {
          return proceed('Message is not exists!');
        }
        const cachedDetailData = JSON.parse(cachedData);
        if(cachedDetailData && !cachedDetailData.ackId) {
          return proceed('ackId is not exists!');
        }
        request({
          'method': 'POST',
          'uri': 'https://www.googleapis.com/oauth2/v4/token',
          'json': true,
          'body': {
            'client_secret': 'SvMeG-XQUsMBz0pKP2OiAE1I',
            'grant_type': 'refresh_token',
            'refresh_token': '1/ja1wqVsbHB4jKVma6o3lZjy0GwUwKTgyl-vekVvYS4I',
            'client_id':
              '45591008103-alm6on1qu1apr5airh65rni0scf9qad8.apps.googleusercontent.com'
          }
        }).then((response) => {
          const accessToken = response.access_token;
          request({
            'method': 'POST',
            'uri': `https://pubsub.googleapis.com/v1/projects/fulfil-web/subscriptions/` +
                      `${sails.config.custom.inductionPubSubTopic}:acknowledge?access_token=${accessToken}`,
            'json': true,
            'body': {
              "ackIds": [
                cachedDetailData.ackId
              ]
            }
          }).then((response) => {

            db.hdel("fulfil_induction", cachedDetailData.id ,(err) => {

              if(err) {
                return proceed(err);
              }

              if(askType === 'accept') {
                cachedDetailData.data['accepted'] = true;
              } else if(askType === 'done') {
                cachedDetailData.data['completed'] = true;
              }
              const dataBuffer = Buffer.from(JSON.stringify(cachedDetailData.data));

              pubsub
                .topic('INDUCTION')
                .publisher()
                .publish(dataBuffer)
                .then(msg => {
                  console.log(`Message ${msg} published to topic INDUCTION.`);
                })
                .catch(err => {
                  console.error('ERROR:', err);
                });

              return proceed(undefined, response);

            });
          }).catch(err => {
            return proceed(err);
          });
        }).catch(err => {
          return proceed(err);
        });
      });
    }).exec((err, data) => {
      if (err) { return res.serverError(err); }
      return res.json(data);
    });
  },

  sendValidateMessageRequest : async function(req, res) {
    const messageId = req.param('message_id');
    if(!messageId) {
      return res.status(500).json({
        message : 'message id not found'
      });
    }

    const from = req.param('from');
    if(!from) {
      return res.status(500).json({
        message : 'from address is not found'
      });
    }

    const to = req.param('to');
    if(!to) {
      return res.status(500).json({
        message : 'to address is not found'
      });
    }

    const type = req.param('type');
    if(!type) {
      return res.status(500).json({
        message : 'type not found'
      });
    }

    sails.getDatastore('cache').leaseConnection((db, proceed) => {
      db.hget("fulfil_induction", messageId ,(err, cachedData) => {
        if (err) {
          return proceed(err);
        }
        if (!cachedData) {
          return proceed('Message is not exists!');
        }
        const cachedDetailData = JSON.parse(cachedData);

        cachedDetailData.data.from = from;
        cachedDetailData.data.to = to;
        cachedDetailData.data.type = type;

        const dataBuffer = Buffer.from(JSON.stringify(cachedDetailData.data));

        pubsub
          .topic('INDUCTION')
          .publisher()
          .publish(dataBuffer)
          .then(msg => {
            console.log(`Message ${msg} published to topic INDUCTION.`);
          })
          .catch(err => {
            console.error('ERROR:', err);
          });

        return proceed(undefined, cachedDetailData);

      });
    }).exec((err, data) => {
      if (err) { return res.serverError(err); }
      return res.json(data);
    });
  },

  flushRedisCache : async function(req, res) {
    sails.getDatastore('cache').leaseConnection((db, proceed) => {
      db.flushall((err, succeeded) => {
        if(err) {
          return proceed(err);
        }
        return proceed(undefined, succeeded);
      })
    }).exec((err, data) => {
      if (err) { return res.serverError(err); }
      return res.json(data);
    });
  }
};

