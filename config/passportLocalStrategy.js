const passport = require('passport');
      const LocalStrategy = require('passport-local').Strategy;
      const bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, ((req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({email}).exec((err, user) => {
        if (err || !user) {
          return done(err);
        }

        bcrypt.compare(password, user.password, (err, res) => {
          if (err) {
            return done(null, false, {message: err});
          }
          if (!res) {
            return done(null, false, {
              message: 'Username or password may be wrong or user not exists.'
            });
          } else {
            req.logIn(user, (err) => {
              if (err) {
                return done(null, false, {message: err});
              }
              return done(null, user, {message: 'Logged In Successfully'});
            });
          }
        });
      });
    });
  })
));
