const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const _ = require("lodash");
const bcryptjs = require("bcryptjs");
const keys = require('../config/keys');

const usersSchema = new Schema({
  email: {
    type: String,
    required: [true, "User email required"],
    minlength: 3,
    trim: true,
    unique: true,
    validate: {
      validator: value => {
        return validator.isEmail(value);
      },
      message: "{VALUE} is not a valid email address!"
    }
  },
  password: {
    type: String,
    required: [true, "User password required"],
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

//define custom instance method by override toJSON
usersSchema.methods.toJSON = function() {
  const user = this;

  //you can directly use user as the object, don't need to call user.toObject()
  return _.pick(user, ["_id", "email"]);
  // const userObj = user.toObject();
  // return _.pick(userObj, ['_id', 'email']);
};

usersSchema.pre("save", function(next){
  const user = this;

  if(user.isModified('password')){
    bcryptjs.genSalt(10,(err, salt)=>{
      bcryptjs.hash(user.password, salt, (err, password)=>{
        if(err){
          console.log('Error at hashing password');
        } else{
          user.password = password;
          next();
        }
      })
    })
  } else {
    next();
  }
});

//define custom instance method
usersSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toString(), access: access }, keys.jwtSecret)
    .toString();

  user.tokens.push({ access, token });

  //you can capture "result" as returned promise argument, but we need to return token
  return user.save().then(result => {
    return token;
  });
};

//when the called function such as "removeToken"is an expected promise of resolve/reject, no need to add .then(resolve, reject) here
usersSchema.methods.removeToken = function(token){
  const user = this;
  return user.update({
    $pull:{
      tokens:{token}
    }
  });
};

//create schema custom static method
usersSchema.statics.findIdByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, keys.jwtSecret);
  } catch (err) {

    //string parameter should not be null. Otherwise will cause downstream error handling error.
    return Promise.reject('invalid token!');
  }

  //return promise is to return a object where callback can be attached. Therefore with return here
  //you don't need to add callback as the second parameter of findOne().
  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

usersSchema.statics.findOneByCredential = function (email, password){
  const User = this;
  return User.findOne({email}).then((user)=>{
    if (!user){
      return Promise.reject();
    }
    return new Promise((resolve, reject)=>{
      //in compare() callback, res return boolean, not return the user!!!
      bcryptjs.compare(password, user.password, (err, res)=>{
        if (res){
          // resolve(res);   return true or false
          resolve(user);
        }else {
          reject();
        }
      });
    });
  });
};

module.exports.User = mongoose.model("users", usersSchema);
