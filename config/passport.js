var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GitHubStrategy = require('passport-github').Strategy;

// load up the user model
var User = require('./models/user');

// load the auth variables
var googleClientID = process.env.googleClientID;
var googleClientSecret = process.env.googleClientSecret;
var googleCallbackURL = process.env.googleCallbackURL;
var githubClientID = process.env.githubClientID;
var githubClientSecret = process.env.githubClientSecret;
var githubCallbackURL = process.env.githubCallbackURL;

module.exports = function(passport) {

    // passport session setup ==================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // GOOGLE ==================================================================
    passport.use(new GoogleStrategy({

        clientID        : googleClientID,
        clientSecret    : googleClientSecret,
        callbackURL     : googleCallbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {

            // if no user in session
            if (!req.user) {

                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user);

                    // if not user is found, creare new
                    } else {
                        var newUser          = new User();

                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session

                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }

        });

    }));

    // GITHUB ==================================================================
    passport.use(new GitHubStrategy({

        clientID        : githubClientID,
        clientSecret    : githubClientSecret,
        callbackURL     : githubCallbackURL,
        passReqToCallback : true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        scope: [ 'user:email' ]

    },
    function(req, token, refreshToken, profile, done) {
        
        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            // if not logged in
            if (!req.user) {

                User.findOne({ 'github.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.github.token) {
                            user.github.token = token;
                            user.github.name = profile.displayName;
                            user.github.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        // if not logged in and no user found, create new user
                        var newUser = new User();

                        newUser.github.id = profile.id;
                        newUser.github.token = token;
                        newUser.github.name = profile.displayName;
                        newUser.github.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            // else user already exists and is logged in, we have to link accounts
            } else {
                var user = req.user; // pull the user out of the session

                user.github.id = profile.id;
                user.github.token = token;
                user.github.name = profile.displayName;
                user.github.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }

        });

    }));


};