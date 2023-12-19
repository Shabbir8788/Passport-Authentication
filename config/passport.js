const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../models/Users");

const passport = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // Match User
          const user = await User.findOne({ email: email });

          if (!user) {
            return done(null, false, {
              message: "This email is not registered",
            });
          }

          // Match Password
          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password Incorrect" });
          }
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

module.exports = passport;
