const passport = require('passport');

// After passport serializes the object, return the id
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// Passport deserializes the user by id and returns the full user object.
passport.deserializeUser((id, cb) => {
  User.findOne({id}, (err, user) => {
    cb(err, user);
  });
});
