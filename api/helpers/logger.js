const request = require('request-promise');

module.exports = {

    friendlyName: 'Error Logs',
    description: 'Return Error Logs',
    sync: false,
    inputs: {
        type: {
            type: 'string',
            required: true
        },
        errorMsg: {
            type: 'string',
            required: true
        },
        logToDb : {
          type : 'boolean',
          required : false,
          defaultsTo : true
        }
    },

    /**
     *
     * @param {Object} inputs
     * @param {Object} exits
    */
    fn: function(inputs, exits) {
            const result = ` ${inputs.errorMsg}, `;
            if (inputs.type === 'error') {
                sails.log.error(result);
            }
            if (inputs.type === 'info') {
                sails.log.info(result);
            }
            if (inputs.type === 'log') {
                sails.log(result);
            }
            if (inputs.type === 'warn') {
                sails.log.warn(result);
            }
            if (inputs.logToDb && process.env.NODE_ENV !== 'test') {
                let accessToken = '';
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
                    accessToken = response.access_token;
                    request({
                        'method': 'POST',
                        'uri': `https://logging.googleapis.com/v2/entries:write?access_token=${accessToken}`,
                        'json': true,
                        'body': {
                            'logName': 'projects/fulfil-web/logs/fulfil-backend',
                            'resource': {
                                    'type': 'global',
                                    'labels': {
                                    'project_id': 'fulfil-web'
                                    }
                            },
                            'entries': [
                                {
                                    'jsonPayload': {
                                        'error_message': `${inputs.errorMsg}`,
                                        'environment': `${sails.config.environment}`,
                                        'types': `BACKEND`
                                    }
                                }
                            ]
                        }
                      }).then((response) => {
                        return exits.success(response);
                      });
                });
            }
    }
};
