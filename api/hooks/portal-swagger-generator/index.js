/**
 * portal-swagger-generator hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
const swaggerDoc = require('sails-hook-swagger-generator/lib/swaggerDoc');

module.exports = function definePortalSwaggerGeneratorHook(sails) {

  return {

    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function(next) {

      const swaggerGenerator = _.cloneDeep(sails.config['swagger-generator']);
      const routes = _.cloneDeep(sails.config.routes);

      let filterRoutes = {};
      _.forEach(routes, (route, identity) => {
          // filter out only internal routes
          if (route.internal) {
            filterRoutes[identity] = {};
            filterRoutes[identity] = route;
          }
      });

      sails.config.routes = filterRoutes;
      sails.config['swagger-generator'].swaggerJsonPath = './swagger/portal_swagger.json';
      swaggerDoc(sails, sails.hooks['swagger-generator']);

      let factoryRoutes = {};
      _.forEach(routes, (route, identity) => {
        // filter out only factory routes
        if (route.swagger && route.swagger.tag &&
            route.swagger.tag.name.toLowerCase() === 'factory') {
          factoryRoutes[identity] = {};
          factoryRoutes[identity] = route;
        }
      });
      sails.config.routes = factoryRoutes;
      sails.config['swagger-generator'].swaggerJsonPath = './swagger/factory_swagger.json';
      swaggerDoc(sails, sails.hooks['swagger-generator']);

      // restore routes and swagger generator for work normally when lift
      sails.config.routes = routes;
      sails.config['swagger-generator'] = swaggerGenerator;

      return next();

    }

  };

};
