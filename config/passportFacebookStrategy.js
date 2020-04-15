const passport = require('passport');
    const FacebookStrategy = require('passport-facebook').Strategy;
    config = require('./env/production').custom;

passport.use(new FacebookStrategy({
  clientID: config.passportFacebookClientID,
  clientSecret: config.passportFacebookClientSecret,
  callbackURL: config.passportFacebookAuthCallbackURL,
  profileFields: ['email', 'picture', 'name'],
  passReqToCallback: true
}, (async (req, token, tokenSecret, profile, done) => {

    const userID = req.query.state ? User.decryptUserKey(req.query.state) : null;

    const data = {
      id: profile.id,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email: profile.emails[0].value,
      picture: profile.photos[0].value
    };

    // check email is register before or not if so then update existing record with facebook id
    User.findOne({email : data.email}, async (err, user) => {
      if (err) {
        return done(null, false, {message: 'Something went wrong'});
      }

      if (user) {
         const user = await User.update({email : data.email}).set({
           fb_id : data.id
         }).fetch();
         return done(null, user);
      } else {

        // check guest user is exists if so then update their fields
        // with facebook profile else create new user with facebook profile
        User.findOne({id: userID}, async (err, userInner) => {
          if (err) {
            return done(null, false, {message: 'Something went wrong'});
          }
          let user;
          if (userInner) {
            user = await User.update({id: userID}).set({
              first: data.first_name,
              last: data.last_name,
              email: data.email,
              fb_id: data.id
            }).fetch();
          } else {
            user = await User.create({
              first: data.first_name,
              last: data.last_name,
              email: data.email,
              fb_id: data.id
            }).fetch();
          }
          done(null, user);
        });
      }
    });

  })
));
