const { Server } = require("socket.io");
var express = require('express');
var app = express();

app.use(express.static('public'));

const io = new Server({ 
    cors: {
        origin: "*"
    }
});
const mapWidth = 10000;
const mapHeight = 10000;

var data = {} // user: [xcor, ycor, area]
var agarPos = [] // store positions of agar

var spawnAgar = () => {
  agarPos.push([parseInt(Math.random() * mapWidth), parseInt(Math.random() * mapHeight), 5])
  console.log(agarPos)
  io.emit("updateFromServer", data, agarPos)
} 

io.on("connection", (socket) => {
  io.emit("updateFromServer", data, agarPos) // send to all connected clients
  // socket.emit("updateFromServer") // only send to the client who connected

  socket.on("getData", (arg) => {
    console.log(data)
    socket.emit("giveBackData", data[arg])
  })

  socket.on("getList", () => {
    socket.emit("giveList", data)
  })
  
  socket.on("updateFromClient", (args) => { // listen from a specific socket
    if(args == null) { // get data without sending data
      io.emit("updateFromServer", data, agarPos)
    } else {
      console.log("got it")
      userdata = []
      console.log(args)
      user = args[0]
      console.log(user)
      if (data[user] == null) {
        data[user] = []
      }
      for(var i = 1; i < args.length; i++) {
        userdata[i - 1] = args[i]
      }
      data[user][0] = userdata
      console.log(data)
      io.emit("updateFromServer", data, agarPos)
    }
  });
  socket.on("updateFromClient2", (args) => { // listen from a specific socket
    if(args == null) { // get data without sending data
      io.emit("updateFromServer", data, agarPos)
    } else {
      console.log("got it")
      userdata = []
      user = args[0]
      console.log(user)
      if (data[user] == null) {
        data[user] = []
      }
      for(var i = 1; i < args.length; i++) {
        data[user][i - 1] = args[i]
      }
      console.log(data)
      io.emit("updateFromServer", data, agarPos)
    }
    
  });
  socket.on("updateFromClient2.5", (users, agar, i, size) => { // listen from a specific socket
    if (users == "users") {
      console.log("removing user")
      delete data[agar]
    }
    else if (users == "agar") {
      console.log("removing agar at pos", agar)
      agarPos.splice(agar, 1)
    }
    else if (users == "size") {
      console.log(size)
      data[agar][i][2] = size
      console.log(data)
    }
    io.emit("updateFromServer", data, agarPos)
  });
});



setInterval(spawnAgar, 1000) // create new agar every second
io.listen(3000);
