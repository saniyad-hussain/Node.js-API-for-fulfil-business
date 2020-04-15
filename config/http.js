/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */


const {Volume} = require('memfs');
const fs = require('fs');
const {ufs} = require('unionfs');

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /**
     * Middleware for init passport library and maintain session for each request.
     */
    passportInit    : require('passport').initialize(),
    passportSession : require('passport').session(),


    rateLimiter: async (req, res, next) => {
      // TODO(Sanjay): Fix this logic.
      // Rate limiting is temporarily forcefully disabled.
      return next();
      if (sails.config.environment !== 'production') {
        return next();
      }

      const key = req.headers['key'];

      if (!key) {
        return next();
      }

      const limit = ufs.readFileSync(`/rateLimit/${key}`, 'utf8');
      let limitRemain = Number.parseInt(ufs.readFileSync(`/rateLimitRemain/${key}`, 'utf8'));
      let interval = Number.parseInt(ufs.readFileSync(`/rateLimitResetInterval/${key}`, 'utf8'));
      const currentDate = new Date().getTime();

      /**
       * Reset limit of specific api key if reset interval time is passed then
       */
      const resetLimitFunc = () => {
        limitRemain = limit;
        interval = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).getTime();
        const vol = Volume.fromJSON({
          [`/rateLimitResetInterval/${key}`]: interval.toString()
        });
        ufs.use(fs).use(vol);
        Apikeylimit.update({api_key : key}).set({reset_interval: interval});
      };

      if (limitRemain === 0) {
        if (currentDate > interval) {
          resetLimitFunc();
        } else {
          return res.status(403).json({
            'message': `API rate limit exceeded for ${key}`
          });
        }
      } else {
        if (currentDate > interval) {
          resetLimitFunc();
        }
      }

      limitRemain = limitRemain > 0 ? limitRemain - 1 : 0;

      const vol = Volume.fromJSON({
        [`/rateLimitRemain/${key}`]: limitRemain.toString()
      });
      ufs.use(fs).use(vol);

      res.set({
        'X-RateLimit-Limit': limit,
        'X-RateLimit-Remaining' : limitRemain,
        'X-RateLimit-Reset' : interval
      });
      return next();
    },

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    order: [
      'cookieParser',
      'session',
      'passportInit',
      'passportSession',
      'bodyParser',
      'compress',
      'rateLimiter',
      //   'poweredBy',
      'disabledRoutes',
      'router',
      'swagger',
      'portalSwagger',
      'errorHander'
    //   'www',
    //   'favicon',
    ],

    /**
      * If we disable routes but setting response: 'notFound' it will throw
      * a 404, but the package we use for generating swagger is not smart enough
      * to realize we don't want to document disabled routes. We like using
      * sails waterline for autogenerating models, but don't want to expose ALL
      * methods, and we require swagger documentation. So I wrote an inline
      * http processor which checks to see if the requested url and method
      * are listed in the newly created disabledRoutes dictionary inside of
      * routes.js and if it is, I will automatically throw a 404.
      * @param {Request} req
      * @param {Response} res
      * @param {next} next
      * @returns {*}
      */
    disabledRoutes: (req, res, next) => {

      let isExists = false;
      _.forIn(sails.config.disabledRoutes, (value, key) => {
        const frags = key.split(' /');
        if (`/${ frags[1].toLowerCase()}` === req.path.toLowerCase()
            && req.method.toLowerCase() === frags[0].toLowerCase()
        ) {
          isExists = true;
        }
      });

      if (isExists) {
        return res.sendStatus(404);
      } else {
        return next();
      }

    },

    /**
     * If I added a route which points to a controller, then the stupid swagger
     * autogenerating module, will list it in our swagger documentation. So I
     * added an http processor here, which serves the generated file at the path
     * /swagger
     * @param {Request} req
     * @param {Response} res
     */
    swagger: (req, res, next) => {
      if (req.path !== '/swagger') {
        return next();
      }
      const fs = require('fs');
      fs.readFile('./swagger/swagger.json', 'utf8', (err, contents) => {
      if (err) {
        console.error(err);
      }

      // The swagger autogen module is not very flexible and adds a stuff
      // which isnt very useful. This is just a simple helper method to remove
      // some of the sections we don't care about from the swagger output.
      const swagger = JSON.parse(contents);
      swagger.tags = [
        {
          name: "partners",
          description: "",
        },
        {
          name: "dashboard",
          description: ""
        },
        {
          name: "factory",
          description: ""
        },
        {
          name: "demoapp",
          description: ""
        },
        {
          name: "inspection",
          description: ""
        }
      ];
      res.setHeader('content-type', 'application/json');
      res.send(swagger);
      });
    },

    /**
     * If I added a route which points to a controller, then the stupid swagger
     * autogenerating module, will list it in our swagger documentation. So I
     * added an http processor here, which serves the generated file at the path
     * /portal_swagger
     * @param {Request} req
     * @param {Response} res
     */
    portalSwagger : (req, res, next) => {
      if (req.path !== '/portal_swagger') {
        return next();
      }
      const fs = require('fs');
      fs.readFile('./swagger/portal_swagger.json', 'utf8', (err, contents) => {
        if (err) {
          console.error(err);
        }

        // The swagger autogen module is not very flexible and adds a stuff
        // which isnt very useful. This is just a simple helper method to remove
        // some of the sections we don't care about from the swagger output.
        const swagger = JSON.parse(contents);
        swagger.tags = [
          {
            name: "partners",
            description: "",
          },
          {
            name: "dashboard",
            description: ""
          },
          {
            name: "factory",
            description: ""
          },
          {
            name: "demoapp",
            description: ""
          },
          {
            name: "inspection",
            description: ""
          }
        ];
        res.setHeader('content-type', 'application/json');
        res.send(swagger);
      });
    },

    /**
     * Application routes error handler if no routes found
     * @param req
     * @param res
     * @returns {*}
     */
    errorHander : (req, res) => {
      return res.sendStatus(404);
    }
  }
};
