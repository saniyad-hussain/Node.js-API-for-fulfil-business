module.exports = {
  baseUrl: 'http://35.196.51.11/',
  internalEmailAddress: 'matt.gardner.hcc@gmail.com',
  passportGoogleClientID:
    '748569241093-ik8e4vrhc9r5a5c25u67n5von0ah320h.apps.googleusercontent.com',
  passportGoogleClientSecret: '4I0kw7xS9GUxgnvbBeOJ0QmT',
  passportGoogleAuthCallbackURL: 'http://35.196.51.11/auth/google/callback',
  passportFacebookClientID: '1921472881294469',
  passportFacebookClientSecret: '183d21f85e12d684a2610bce299fe99e',
  passportFacebookAuthCallbackURL: 'http://35.196.51.11/auth/facebook/callback',
  appUrl: 'http://localhost:8100',
  port: 80,
  ['swagger-generator']: {
    swagger: {
      host: '35.196.51.11'
    }
  },
  sockets: {

    transports: [
      'websocket',
      'htmlfile',
      'polling'
    ],

    onlyAllowOrigins: [
      'http://localhost:1337',
      'http://localhost:8100',
      'http://localhost:4200',
      'http://34.102.177.21',
      'http://35.201.116.227',
      'http://fulfil.store',
      'https://fulfil.store',
      'http://control.fulfil.store',
      'https://control.fulfil.store',
      'http://dashboard.fulfil.store',
      'https://dashboard.fulfil.store'
    ],
  },
  datastores: {
    default: {
      adapter: 'sails-mysql',
      url: 'mysql://root:4z8r7JS5U8P@35.197.96.87:3306/fulfil_db_dev'
    }
  }
};
