var sendUpdate = (myPositionX, myPositionY, mySize) => {
    console.log("send")
    socket.emit("updateFromClient", [myUsername, myPositionX, myPositionY, mySize])
  }
  socket.on("updateFromServer", (players, agar) => {
    drawGame(players, agar)
  });

// Getting key presses
// Calls function that sees if an arrow key was pressed along with parameter
// stating whether a keydown (true) or keyup event occured
document.onkeydown = function(){arrowChange(true, "User")};
document.onkeyup = function(){arrowChange(false, "User")};

  function arrowChange(isDown, user) {
  var key = event.keyCode;
      // determines if an arrow key was pressed
      switch (key) {
         case 37: case 38: case 39: case 40:
            // if a keydown event occured, starts movement by calling change
            // timer with isStart as true
            if (isDown) {
              // user is only specified in instances of changeTimer so that it
              // is there when move is called and can be used to update server
              // data
              changeTimer(user, key, true);
            }
            // if the event was keyup, stops movement by calling change timer
            // with isStart as false
            else {
              changeTimer(user, key, false);
            }
            break;
      }
   };

   // variables to allow functions to be called at appropriate interval
   // separately for left, right, up and down movement
   var timerL;
   var timerU;
   var timerR;
   var timerD;

   function changeTimer(user, key, isStart) {
    console.log(key)
     switch (key) {
       // for left key
        case 37:
           // if starting movement
           if (isStart) {
             // console.log("starting" + user + key);
             // clears interval (stops calling function at interval specified in
             // ms) to avoid multiple assignments to same variable
             timerL = clearInterval(timerL);
             // sets appropriate interval for the function move to be called at
             // with user and key as parameters
             timerL = setInterval(move, 0.5, key);
           }
           // if stopping movement
           else {
             // console.log("stopping" + user + key);
             // clears interval so move is no longer called
             timerL = clearInterval(timerL);
           }
           break;
        // same as left key but for up
        case 38:
           if (isStart) {
             timerU = clearInterval(timerU);
             // console.log("starting" + user + key);
             timerU = setInterval(move, 0.5, key);
           }
           else {
             // console.log("stopping" + user + key);
             timerU = clearInterval(timerU);
           }
           break;
        // same as other arrow keys but for right
        case 39:
        if (isStart) {
          timerR = clearInterval(timerR);
          // console.log("starting" + user + key);
          timerR = setInterval(move, 0.5, key);
        }
        else {
          //console.log("stopping" + user + key);
          timerR = clearInterval(timerR);
        }
           break;
        // same as other arrow keys but for down
        case 40:
          if (isStart) {
            timerD = clearInterval(timerD);
            // console.log("starting" + user + key);
            timerD = setInterval(move, 0.5, key);
          }
          else {
            // console.log("stopping" + user + key);
            timerD = clearInterval(timerD);
          }
           break;
     }
   }

var move = (key) => {
  socket.emit("getData", myUsername)
  console.log("moved" + key)
  actualKey = key
  ran = false
  socket.on("giveBackData", (args) => { // this runs multiple times for some reason
    if(!ran) { // this will make it not run multiple times
      if(actualKey == 37) {
        console.log("left")
        args[0] -= 1
      } else if(actualKey == 39) {
        console.log("right")
        args[0] += 1
      } else if(actualKey == 38) {
        args[1] -= 1
      } else if(actualKey == 40) {
        args[1] += 1
      }
      console.log(args)
      // update the position
      sendUpdate(args[0], args[1], args[2])
      ran = true
    }
 })
}
