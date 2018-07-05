const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripe_secret);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  //gotcha: when post a request to express server, express not automatically parse payload
  //need to apply body-parser
  app.post("/api/txn", requireLogin, async (req, res) => {
    try {
      //
      await stripe.charges.create({
        amount: 500,
        currency: "usd",
        source: req.body.id, // obtained with Stripe.js
      });

      //mongoose user model is available as req.user through passport middleware
      req.user.credits += 5;
      const user = await req.user.save();

      res.status(200).send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
