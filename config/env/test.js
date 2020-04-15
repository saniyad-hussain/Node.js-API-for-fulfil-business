// const fs = require('fs');

module.exports = {
  baseUrl: 'http://fulfil-api.herokuapp.com/',
  internalEmailAddress: 'matt.gardner.hcc@gmail.com',
  passportGoogleClientID:
    '748569241093-ik8e4vrhc9r5a5c25u67n5von0ah320h.apps.googleusercontent.com',
  passportGoogleClientSecret: '4I0kw7xS9GUxgnvbBeOJ0QmT',
  passportGoogleAuthCallbackURL: 'http://localhost:1337/auth/google/callback',
  passportFacebookClientID: '1921472881294469',
  passportFacebookClientSecret: '183d21f85e12d684a2610bce299fe99e',
  passportFacebookAuthCallbackURL: 'http://localhost:1337/auth/facebook/callback',
  appUrl: 'http://localhost:8100',
  port: 1338,
  datastores: {
    default: {
      adapter: 'sails-mysql',
      url: 'mysql://root:4z8r7JS5U8P@35.197.96.87:3306/fulfil_db_dev'
    }
  }
};
