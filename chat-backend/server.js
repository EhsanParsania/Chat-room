const express = require("express");
const app = express();
const socket = require("socket.io");
// const color = require("colors");
const cors = require("cors");
const { get_Current_User, user_Disconnect, join_User } = require("./user");

// for two side connection
app.use(express());

const port = 8000;

app.use(cors());

var server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)} `
      .green
  )
);

const io = socket(server);

//initializing the socket io connection 
io.on("connection", (socket) => {
  //for a new user joining the room
  socket.on("joinRoom", ({ username, roomname }) => {
    //* create user
    const newUser = join_User(socket.id, username, roomname);
    console.log(socket.id, " : new user ID");
    socket.join(newUser.room);

    //display a welcome message to the user who have joined a room
    socket.emit("message", {
      userId: newUser.id,
      username: newUser.username,
      text: `Welcome ${newUser.username}`,
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(newUser.room).emit("message", {
      userId: newUser.id,
      username: newUser.username,
      text: `${newUser.username} has joined the chat`,
    });
  });

  //user sending message
  socket.on("chat", (text) => {
    //gets the room user and the message sent
    const newUser = get_Current_User(socket.id);

    io.to(newUser?.room).emit("message", {
      userId: newUser?.id,
      username: newUser?.username,
      text: text,
    });
  });

  //when the user exits the room
  socket.on("disconnect", () => {
    //the user is deleted from array of users and a left room message displayed
    const newUser = user_Disconnect(socket.id);

    if (newUser) {
      io.to(newUser.room).emit("message", {
        userId: newUser.id,
        username: newUser.username,
        text: `${newUser.username} has left the room`,
      });
    }
  });
});