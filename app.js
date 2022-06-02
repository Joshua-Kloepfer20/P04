const { Server } = require("socket.io");

const io = new Server({ 
    cors: {
        origin: "*"
    }
});
// test data - will change later
var data = {
  "X": [250, 250, 10],
  "Y": [100, 100, 5],
  "Z": [400, 300, 20]
}
var drawDot = () => {
  console.log("data send")
};
io.on("connection", (socket) => {
  io.emit("updateFromServer", data) // send to all connected clients
  // socket.emit("updateFromServer") // only send to the client who connected

  socket.on("getData", (arg) => {
    console.log("west virginia")
    socket.emit("giveBackData", data[arg])
  })
  
  socket.on("updateFromClient", (args) => { // listen from a specific socket
    console.log("got it")
    user = null
    userdata = []
    for(var i = 0; i < args.length; i++) {
      if(i == 0){
        user = args[i]
      } else{
        userdata.push(args[i])
      }
    }
    data[user] = userdata
    console.log(data)
    io.emit("updateFromServer", data)
  });
});



io.listen(3000);