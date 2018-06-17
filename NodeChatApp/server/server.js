const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");
const { generateMessage, generateLocationMessage } = require("./message");
const {Users} = require('./users');

const app = express();
const dir = path.join("__dirname", "../public");

const server = http.createServer(app);
const io = socketIO(server);
let users = new Users();
//no need to use '/' here for homepage
// app.use('/', express.static(dir));
app.use(express.static(dir));

//ES6 currently is not supported by mobile firefox, IE7 etc.
io.on("connection", socket => {
  console.log("new user connected");

  socket.on('join', (params, callback)=>{
    //validate it's a string, not empty string or other type
    if((typeof params.name ==='string' && params.name.trim().length > 0)
      &&(typeof params.room ==='string' && params.room.trim().length > 0)){

      //join a particular communication specified by the string params.room
      socket.join(params.room);
      //remove previous user section if the user joined before and had left
      users.removeUser(socket.id);
      //add user to the chat room
      users.addUser(socket.id, params.room, params.name);
      //leave a particular communication specified by the tring params.room
      //socket.leave(params.room);
      //io.emit: emit to everyone
      //io.to(params.room).emit: emit to everyone who are in the same room
      //socket.broadcast.to(params.room).emit: emit to everyone in the same room except the owner

      //emit an event to update user list on UI
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      socket.emit(
        "newMessageEvent",
        generateMessage("Admin", "welcome to NodeChat")
      );

      //broadcast event to all sockets including all connected clients and server
      socket.broadcast.to(params.room).emit(
        "newMessageEvent",
        generateMessage("Admin", `welcome! ${params.name} just joined!`)
      );
      callback();
    } else{
      callback('Your request is denied. Your name and room name are required!');
    }
  });

  socket.on("createMessageEvent", (msg, callback) => {
    // console.log("new message from client: ", msg);
    io.to(msg.params.room).emit("newMessageEvent", generateMessage(msg.from, msg.text));
    callback();
  });

  socket.on("shareLocation", (msg, callback) => {
    io.to(msg.params.room).emit(
      "newLocationMessage",
      generateLocationMessage(msg.from, msg.text.lat, msg.text.lon)
    );
    callback();
  });

  socket.on("disconnect", () => {
    // console.log("user disconnected");
    const user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessageEvent', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

const port = process.env.PORT || 3000;
server.listen(port, "localhost", err => {
  if (!err) {
    return console.log(`server set up at port ${port}`);
  }
});
