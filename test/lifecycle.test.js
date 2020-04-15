let sails = require('sails');

// Before running any tests...
before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(1000 * 10 * 60);

  // Set test environment for apply testing configurations
  process.env.NODE_ENV = 'test';
  process.env.API_KEY = '889a68d7-c7e8-4625-9ed3-d49a6e356209';
  process.env.USER_ID = '63ec59c9e58c1151ca6f3c7ec4d3d5740522f4e98494fc4117fa944a0319ba21f1f347d96387ec5e7216d281dde3d20abb5341d1168f664880fdf5041e8cae65a4985bf9e9fb720f027c5f7709886836';
  process.env.TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJzZWNyZXQiOiIzODEvY2EyNmRmY2JkZGItNjEzYzFiMzc2YzE5ZjViNTI1PSIsImFwaUtleSI6Ijg4OWE2OGQ3LWM3ZTgtNDYyNS05ZWQzLWQ0OWE2ZTM1NjIwOSIsInBlcm1pc3Npb25zIjp7ImFsbG93UXVlcnlBbGxPcmRlcnMiOnRydWUsImFsbG93Q3Jvc3NPcmlnaW5BY2Nlc3MiOnRydWUsImFsbG93TW9kaWZ5Q2FydCI6dHJ1ZSwiYWxsb3dSZXNldEFsbE9yZGVyIjp0cnVlLCJhbGxvd0NhcnRPcGVyYXRpb24iOnRydWUsImFsbG93TW9kaWZ5SW52ZW50b3J5Ijp0cnVlLCJhbGxvd09yZGVyUGxhY2UiOnRydWUsImFsbG93R2V0T3JkZXJCeVVzZXIiOnRydWUsImFsbG93TW9kaWZ5U2hvcHBpbmciOnRydWUsImFsbG93R2V0U2hvcHBpbmciOnRydWUsImFsbG93Q3JlYXRlVXNlciI6dHJ1ZSwiYWxsb3dHZXRVc2VyIjp0cnVlLCJhbGxvd0FkZFJlbW92ZUl0ZW1Gcm9tQ2FydCI6dHJ1ZSwiYWxsb3dHZW5lcmF0ZURlbW9PcmRlciI6dHJ1ZX0sInVzZXIiOiJVU0VSIiwiaXNzdWVkIjoxNTY0Mzc2MjQ2NjkyfSwiaWF0IjoxNTY0Mzc2MjQ2fQ.L0hiLuB1g-9Ms5oTpaaHYsWTsCShMlHS9XLIszUcg3g';

  sails.lift({
    // Your sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    //hooks: { grunt: false },
    log: { level: 'warn' },

  }, function(err) {
    if (err) { return done(err); }

    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)

    return done();
  });
});

// After all tests have finished...
after(function(done) {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);

});
