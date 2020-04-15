/**
 * is-key-valid
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns {Promise<*>}
 */
module.exports = async function(req, res, next) {

  const key = req.param('key') || req.headers['key'];

  if (key) {

    req.key = key;

    // Need to delete key param if blueprint is enabled because
    // waterline modal is not allowed to pass other params then
    // defined params like where,search by field etc.

    delete req.query.key;

    if (key === 'abc123') {
      // Make request valid for default access API key.
      req.isValid = true;
      return next();
    }

    // Find API access configuration by key and store into config params in request
    const config = _.find(sails.config.apiPermission.config, {apiKey : key});

    if (config) {
      req.config = config;

      // Find store by key and store into config params in request
      const storeConfig = _.find(sails.config.apiPermission.store, {apiKey : key});

      if (storeConfig) {
        req.storeConfig = storeConfig;

        const skipRoute = _.indexOf(
          sails.config.apiPermission.skipRoutes,
          req.route.path.toLowerCase()
        );

        if (skipRoute === -1) {
          req.query.api_key = req.key;
        }

      } else {
        return res.status(500).json({
          message : 'API key is not valid for existing stores'
        });
      }

      return next();
    }

  }

  // pass without key header for skip routes
  const skipRoute = _.indexOf(
    _.map(sails.config.apiPermission.skipRoutes, i => i.toLowerCase()),
    req.route.path.toLowerCase());
  if (skipRoute !== -1) {
    return next();
  }

  // temporarily disable API key checks until clients have added them
  // req.isValid = true;
  // return next();
  return res.status(500).json({
    message : 'Invalid API key'
  });

};
