const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const initialize = (passport, getUserEmail, getUserById) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserEmail(email);
    //check IF theree is a user
    if (user === null) {
      return done(null, false, { message: "No user with that email found" });
    }
    try {
      // IF password matches the password entered!
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password does not match" });
      }
    } catch (err) {
      return done(err);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return  done(null, getUserById(id))
    });
};
module.exports = initialize;
