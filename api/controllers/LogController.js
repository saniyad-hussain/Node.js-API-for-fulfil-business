const request = require('request-promise');
/**
 * This function is Called when error exception occurs.
 * data get inserted into elastic index:errorlog
 * @param data<tuple3(error_message,environment,type,logName)>
 */

module.exports = {

  /**
   *
   * @param {Object} data
   * @param {Res} res
   */
    logInsert: function(data, res) {
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
                      'logName': `projects/fulfil-web/logs/${data.query.logName}`,
                      'resource': {
                              'type': 'global',
                              'labels': {
                              'project_id': 'fulfil-web'
                              }
                      },
                      'entries': [
                          {
                              'jsonPayload': {
                                  'error_message': `${data.query.error_message}`,
                                  'environment': `${data.query.environment}`,
                                  'types': `${data.query.types}`
                              }
                          }
                      ]
                  }
                }).then((response) => {
                  return res.json(response);
                });
          });
   },

  /**
   *
   * @param {Object} data
   * @param {Res} res
   */
  getAllLog: function(data, res) {
    let accessToken = '';
    let filter = '';
    if (data.query.filterEnvironment === 'all') {
      if ( data.query.filterTypes.toLowerCase() === "dashboard") {
        filter = `resource.type = "global" jsonPayload.types:${data.query.filterTypes}`;
      } else if (data.query.filterTypes.toLowerCase() === "backend") {
        filter = `resource.type = "gce_instance" resource.labels.instance_id:"8717736981091955616"
                    jsonPayload.message != null`;
      }
    } else {
      filter = `jsonPayload.environment:${data.query.filterEnvironment} or ` +
        `jsonPayload.types:${data.query.filterTypes}`;
    }
    if (data.query.searchString !== '') {
      filter += ` or jsonPayload.error_message:${data.query.searchString}`;
    }
    const filterQuery = {
      'projectIds': [
        'fulfil-web'
      ],
      'orderBy': 'timestamp desc',
      'filter' : `${filter}`,
      'pageSize': 1000
    };
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
              'uri': `https://logging.googleapis.com/v2/entries:list?access_token=${accessToken}`,
              'json': true,
              'body': filterQuery
            }).then((response) => {
              return res.json(response);
            });
      });
  }
};
