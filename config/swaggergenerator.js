module.exports['swagger-generator'] = {
    swaggerJsonPath: './swagger/swagger.json',
    parameters: { // we can add up custom parameters here
        SelectQueryParam: {
            in: 'query',
            name: 'select',
            required: false,
            type: 'integer',
            description: 'This helps with what to return for the user and its delimited'
        },
        TokenHeaderParam: {
            in: 'header',
            name: 'token',
            required: true,
            type: 'string',
            description: `Access token required for all POST/PATCH/DELETE and some GET endpoints. 
            If you are calling this endpoint from client side code in a browser you probably 
            do not need a token. If you are calling from your server side code, send the 
            token. If you are trying to call an endpoint which requires a token from client 
            side code within a browser, you probably should not be exposing this endpoint 
            or your access token to the world and should rethink what you are trying to do. 
            See /auth/getToken for generating tokens with your api_key and api_secret`
        },
        KeyHeaderParam: {
          in: 'header',
          name: 'key',
          required: true,
          type: 'string',
          description: 'API key for identifications for each stores'
        }
    },
    blueprint_parameters: {
      list: [
        {
          $ref: '#/parameters/KeyHeaderParam'
        }
      ]
    }, // we can add custom blueprint action to parameters binding here, any specified overrides default created
    swagger: {
        swagger: '2.0',
        info: {
            title: 'Fulfil API documentation',
            description: `Automated fulfilment API provided by Fulfil solutions. 
                          Please contact matt.gardner@fulfil.ai for an access token and api key`,
            termsOfService: 'http://fulfil.store',
            contact: {name: 'Matt Gardner', url: 'https://github.com/Fulfil0518/fulfil-api', email: 'matt.gardner@fulfil.ai'},
            license: {name: 'Apache 2.0', url: 'http://www.apache.org/licenses/LICENSE-2.0.html'},
            version: '1.13.3'
        },
        externalDocs: {url: 'http://docs.fulfil.store'},
        host: 'api.fulfil.store',
        basePath: '/'
    }
};
