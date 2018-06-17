const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");

const keys = require("./config/keys");
const mongoose = require("mongoose");

const { Todo } = require("./models/Todos");
const { User } = require("./models/Users");
const { authenticate } = require("./middleware/authenticate");

mongoose.connect(keys.mongoDBURI);

const app = express();

app.use(bodyParser.json());

app.post("/users", (req, res) => {
  //use lodash pick() to construct an obj "body" with two attributes email and password
  const body = _.pick(req.body, ["email", "password"]);

  //pass body directly to a new User instance. No need to go with {email: xxx, password: xxx}
  const user = new User(body);
  user
    .generateAuthToken()
    .then(token => {
      res.header("x-auth", token).send({ user });
    })
    .catch(err => {
      res.status(400).send({ err });
    });
});

app.post("/users/login", (req, res) => {
  const body = _.pick(req.body, ["email", "password"]);

  User.findOneByCredential(body.email, body.password)
    .then(user => {
      user
        .generateAuthToken()
        .then(token => {
          res
            .header("x-auth", token)
            .status(200)
            .send({ user });
        })
        .catch(err => {
          res.status(400).send({ err });
        });
    })
    .catch(err => {
      res.status(400).send("user not found!");
    });
});

//authenticate is a middleware function
app.get("/users/me", authenticate, (req, res) => {
  res.status(200).send(req.user);
});

app.delete("/users/me/logout", authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    success => {
      res
        .status(200)
        .send("Log out successful: " + JSON.stringify(req.user.email));
    }
  ).catch(err=>{
    res.status(400).send("failed to log out!");
  });
});

app.post("/todos", authenticate, (req, res) => {
  new Todo({ text: req.body.text, _creator: req.user._id }).save(
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send(JSON.stringify(result, undefined, 2));
    }
  );
});

app.get("/todos", authenticate, (req, res) => {
  Todo.find({_creator: req.user._id}).then(
    result => {
      res.send({ result });
    }
  ).catch(err=>{
    res.status(400).send({ err });
  });
});

//set up an api to specify route of /todos/id
app.get("/todos/:id", authenticate, (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send("id not valid");
  } else {
    //Model.find() return a result array, need to check array size for "found" or "not found"
    //Model.findbyId() return boolean. Check true or false
    Todo.find({ _creator: req.user._id, _id: id }).then(
      result => {
        if (result.length > 0) {
          //send an obj instead of an array. give more flexibility to add more params in send()
          res.status(200).send({ result });
        } else {
          res.status(404).send("id not found");
        }
      }
    ).catch(err=>{
      res.status(400).send("querry error");
    });
  }
});

app.delete("/todos/:id", authenticate, (req, res) => {
  const id = req.params.id;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send("id not valid");
  } else {
    //Model.find() return a result array, need to check array size for "found" or "not found"
    //Model.findbyId() return boolean. Check true or false
    Todo.findOneAndRemove({ _creator: req.user._id, _id: id }).then(
      result => {
        if (!result) {
          return res.status(404).send("id not found");
        }
        res.status(200).send({ result });
      }
    ).catch(err=>{
      res.status(400).send("querry error");
    });
  }
});

app.patch("/todos/:id", authenticate, (req, res)=>{
  const id = req.params.id;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send("id not valid!");
  }
  const body = _.pick(req.body, ['text','completed', 'completedAt']);

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime()
    body.text = req.body.text;
  } else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_creator: req.user._id, _id: id}, {$set: body}, {new: true}).then(result=>{
    if(!result){
      return res.status(400).send("data cannot found");
    }
    res.status(200).send({result});

  }).catch(err=>{
    res.status(400).send("data update failed");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "localhost", err => {
  if (err) {
    console.log(err);
  } else {
    console.log("server set up at port ", PORT);
  }
});
