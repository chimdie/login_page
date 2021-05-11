const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserEmail(email);
    if (user === null) {
      return done(null, false, { message: "No user with that email found" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password does not match" });
      }
    } catch (err) {
      return err;
    }
  };
  passport.use(new LocalStrategy({ userNameField: "email" }), authenticateUser);
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
};
module.exports = initialize;
