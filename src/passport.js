const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/user');

// set up passport configs
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, function (accessToken, refreshToken, profile, done) {
    User.findOne({
        'googleid': profile.id
    }, function (err, user) {
        if (err) return done(err);

        if (!user) {
            user = new User({
                name: profile.displayName,
                googleid: profile.id,
                level: 1,
                xp: 0,
                gold: 0,
                health: 20
            });

            user.save(function (err) {
                if (err) console.log(err);

                return done(err, user);
            });
        } else {
            return done(err, user);
        }
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

module.exports = passport;
