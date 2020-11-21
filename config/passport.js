const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

// create passport local strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: "email"
        },
        (email, password, done) => {
            db.User.findOne({ email })
                .then(dbUser => {
                    if (!dbUser) {
                        return done(null, false, {
                            message: "Incorrect email."
                        });
                    }
                    else if (!dbUser.validPassword(password)) {
                        return done(null, false, {
                            message: "Incorrect password."
                        });
                    }
                    return done(null, dbUser)
                });
        }
    )
);

// serialize and deserialize functions
passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

module.exports = passport;