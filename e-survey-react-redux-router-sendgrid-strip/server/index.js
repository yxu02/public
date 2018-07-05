const express = require('express');
const keys = require('./config/keys');

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const passport = require('passport');
//define users model first
require('./models/Users');
require('./models/Survey');
//then use users model in passport.js
require('./services/passport');

mongoose.connect(keys.mongoDBURI);

//require keyword ensures code execution
const app = express();

//body-parser middleware will receive request and parse it to req.body
app.use(bodyParser.json());
//set up cookieSession middleware to extract cookie from http requester
app.use(cookieSession({
  maxAge: 30*24*60*60*1000, //30days x 24 hrs x 60 mins x 60 secs x 1000 msecs
  keys: [keys.cookieKey]   //can provide multiple keys
  }
));

//initialize passport middleware. This is different from invoking passport lib
app.use(passport.initialize());

//enable passport session middleware. Pull user session out of cookie and pass to req.session
app.use(passport.session());

//pass app in as an argument for authRoutes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//dynamic port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
