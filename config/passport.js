var passport = require('passport');
var User = require('../src/models/User');
var FacebookStrategy = require("passport-facebook").Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


//use facebook login with passport strategy (process.env. is enviroment variables)
passport.use(new FacebookStrategy({
    clientID: "1564331986944420",
    clientSecret: "481bc9b42684dd0431322e0d7eead698",
    callbackURL: "http://localhost:5000/users/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
  },
    function (accessToken, refreshToken, profile, done){

      if(profile.emails[0]) {
        User.findOneAndUpdate(
          { emailAdress: profile.emails[0].value },
          {
               fullName: profile.displayName || profile.username,
            emailAdress: profile.emails[0].value,
              imagePath: profile.photos[0].value
          },
          {
            upsert: true
          },
        done
      );
      } else {
        var noEmailError = new Error("Your email privacy settings prevent you from signing into Bookworm.");
        done(noEmailError, null);
      }
    }
));