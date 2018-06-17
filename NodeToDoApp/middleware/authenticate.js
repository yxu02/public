const {User} = require('../models/Users');

module.exports.authenticate = (req, res, next)=>{
  const token = req.header("x-auth");
  User.findIdByToken(token).then(
    user => {
      if (user) {
        req.user = user;
        req.token = token;
        next();
      }
      else return Promise.reject();
    },
    err => {
      res.status(401).send("fail to authenticate");
    }
  );
};

