const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/users');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
      let user = await User.findOne({email});
      try {
        if (!user) {
          return done(null, false, {message: 'That email is not registered'});
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'password incorect'})
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
