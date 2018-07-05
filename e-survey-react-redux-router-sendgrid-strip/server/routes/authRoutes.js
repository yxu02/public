//authenticate using 'google' strategy, ask google server to access user information in
//scopes of 'profile' and 'email'
const passport = require("passport");
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  //this route will already have code info available
  //passport.authenticate is a middleware
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    //after middleware is done, it send to this next function with data in req.user
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  //when current user visit with existing cookie, request went through passport deserialization,
  //mongoose query to mongoDB, retrieve user instance, send to express http request in form of
  //req.user at http://xxxxxxxxxx/api/current_user
  app.get("/api/current_user", (req, res) => {
    if (req.user) {
      //res.send(req.session)  **to show user's session
      res.send(req.user);
    } else {
      res.send("");
    }
  });

  app.get("/api/logout", (req, res) => {
    if (req.user) {
      req.logout();
      res.redirect("/");
    } else {
      res.send("");
    }
  });
};
