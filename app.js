/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful,
 * such as when you deploy to a server, or a PaaS like Heroku.
 *
 * For example:
 *   => `node app.js`
 *   => `npm start`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *
 * The same command-line arguments and env vars are supported, e.g.:
 * `NODE_ENV=production node app.js --port=80 --verbose`
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/app.js
 */


// Ensure we're in the project directory, so cwd-relative paths work as expected
// no matter where we actually lift from.
// > Note: This is not required in order to lift, but it is a convenient default.
process.chdir(__dirname);


// Attempt to import `sails` dependency, as well as `rc` (for loading `.sailsrc` files).
let sails;
let rc;
try {
  sails = require('sails');
  rc = require('sails/accessible/rc');
  elasticSearch = require('elasticsearch');
  elasticClient
   = new elasticSearch.Client({
    host: '34.73.23.12'
  });
  /**
   * I initially tried to create a helper, but I dont want something as verbose
   * as sails.helpers.logger.info. Also it has a ton of funky restrictions.
   * I just want a simple logger which sends all the console logs to
   * elasticsearch, so I am overriding the built in sails.logger
   * Matt: 4/23/19
   */
  sails.logger = {
    generic: (msg, level) => {
      try {
        switch (level) {
          case 'log':
            console.log(msg);
            break;
          case 'error':
            console.error(msg);
            break;
          default:
            console.info(msg);
        }
        setTimeout(() => {
          elasticClient.index({
              index: 'errorlog',
              type: level,
              body: {
                error_message: msg,
                environment: 'PROD',
                type: level
              }
          }).then((resp) => {
            if (!resp._shards.successful) {
              console.error('was not able to send log to log server');
            }
          }, // dont care about success
          (err) => {
 console.info(err);
});
        });
      } catch (err) {
 console.error(err);
}
    },

    info: msg => {
      sails.logger.generic(msg, 'info');
    },

    log: msg => {
      sails.logger.generic(msg, 'log');
    },

    error: msg => {
      sails.logger.generic(msg, 'error');
    }
  };
} catch (err) {
  console.error('Encountered an error when attempting to require(\'sails\'):');
  console.error(err.stack);
  console.error('--');
  console.error('To run an app using `node app.js`, you need to have Sails installed');
  console.error('locally (`./node_modules/sails`).  To do that, just make sure you\'re');
  console.error('in the same directory as your app and run `npm install`.');
  console.error();
  console.error('If Sails is installed globally (i.e. `npm install -g sails`) you can');
  console.error('also run this app with `sails lift`.  Running with `sails lift` will');
  console.error('not run this file (`app.js`), but it will do exactly the same thing.');
  console.error('(It even uses your app directory\'s local Sails install, if possible.)');
  return;
}// -•


// Start server
sails.lift(rc('sails'));
