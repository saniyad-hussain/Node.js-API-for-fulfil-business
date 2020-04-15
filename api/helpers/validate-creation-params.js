module.exports = {
  friendlyName: 'Validate creation parameters',


  description: 'validates that the param dictionary passed only contains keys' +
      ' from the specified model. This makes it easy for creating database ' +
      'rows quickly.',
  exampleUsage: 'let newProduct = await Product.create(' +
    'await sails.helpers.validateCreationParams(Product, req.allParams()))' +
    '.fetch();',
  inputs: {
    model: {
      type: 'ref',
      description: 'A waterline model',
      required: true
    },
    params: {
      type: 'ref',
      description: 'req.allParams() typically',
      required: true
    }
  },


  /**
   *
   * @param {Object} inputs
   * @param {Object} exits
   * @returns {Promise}
   */
  fn: async function(inputs, exits) {
    const sanitizedParams = {};
    const unsanitizedParams = inputs.params;
    for (const i in unsanitizedParams) {
      const value = unsanitizedParams[i];
       if (inputs.model.attributes[i]) {
         sanitizedParams[i] = value === 'NULL' ? null : value;
       }
    }
    return exits.success(sanitizedParams);
  }
};
