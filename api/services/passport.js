var passport = require('passport'), 
  LocalStrategy = require('passport-local').Strategy, 
  bcrypt = require('bcrypt'),
  BearerStrategy = require('passport-http-bearer').Strategy;
 
function findByUsername(u, fn) {
  User.findOne({
    username: u
  }).exec(function (err, user) {
    // Error handling
    if (err) return fn(null, null);
    else return fn(null, user);
  });
}
function findByToken(token, fn) {
  User.findOne({access_token: token}).exec(function(err, user) {
    if (err) return fn(null, null);
    else return fn(null, user);
  });
}

function findById(id, fn) {
  User.findOne(id).exec(function (err, user) {
    if (err) return fn(null, null);
    else return fn(null, user);
  });
}

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

// Use the LocalStrategy within Passport.
passport.use('local', new LocalStrategy(
  function (username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function (err, user) {
        if (err)
          return done(null, err);
        if (!user) {
          return done(null, false, {
            message: 'Unknown user ' + username
          });
        }
        bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, {
              message: 'Invalid Password'
            });
          var returnUser = {
            username: user.username,
            createdAt: user.createdAt,
            id: user.id
          };
          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        });
      })
    });
  }
));

passport.use('bearer', new BearerStrategy(
  function(token, done) {
    // asynchronous validation, for effect...
    process.nextTick(function () {
      // Find the user by token. If there is no user with the given token, set
      // the user to `false` to indicate failure. Otherwise, return the
      // authenticated `user`. 
      findByToken(token, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      })
    });
  }
));
  
