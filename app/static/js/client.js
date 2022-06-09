var sendUpdate = (args) => {
    console.log("send")
    socket.emit("updateFromClient", args)
  }
  socket.on("updateFromServer", (players, agar) => {
    drawGame(players, agar)
  });
var sendUpdate2 = (args) => {
    console.log("send")
    socket.emit("updateFromClient2", args)
  }
  socket.on("updateFromServer", (players, agar) => {
    drawGame(players, agar)
  });
var mouseX = 0;
var mouseY = 0;
// Getting key presses
// Calls function that sees if an arrow key was pressed along with parameter
// stating whether a keydown (true) or keyup event occured
document.onkeydown = function(){arrowChange(true, "User")};
document.onkeyup = function(){arrowChange(false, "User")};

  function arrowChange(isDown, user) {
  var key = event.keyCode;
      // determines if an arrow key was pressed
      switch (key) {
         case 37: case 38: case 39: case 40: case 32:
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
   var pressed = false;
   var timerM;
   var theta;
   var curtime = new Date();

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
        case 32:
          if (isStart) {
            pressed = true

          }
          else if (pressed == true) {
            split()
            pressed = false
          }
          break;
     }
   }

// NOTES: instead of +- 1 establish a speed based on agar size
// change from args[i][0] to args[i][1] to args[i][c][1] ?? as in new data
// structure
// what is the i that is being looped through? is that each smaller cell?
// if so should be changed from i<5 to right amt

var move = (key) => {
  socket.emit("getData", myUsername)
  console.log("moved" + key)
  actualKey = key
  ran = false
  socket.on("giveBackData", (args) => { // this runs multiple times for some reason
    if(!ran) { // this will make it not run multiple times
      if(actualKey == 37) {
        console.log("left")
        for (let i = 0; i < args.length; i++) {
          console.log(args[i][0])
          args[i][0] -= 1
        }
      } else if(actualKey == 39) {
        console.log("right")
        for (let i = 0; i < args.length; i++) {
          args[i][0] += 1
        }
      } else if(actualKey == 38) {
        for (let i = 0; i < args.length; i++) {
          args[i][1] -= 1
        }
      } else if(actualKey == 40) {
        for (let i = 0; i < args.length; i++) {
          args[i][1] += 1
        }
      }
      console.log(args)
      // update the position
      args.unshift(myUsername)
      sendUpdate2(args)
      ran = true
    }
 })
}

var split = () => {
  socket.emit("getData", myUsername)
  socket.on("giveBackdata", (args) => {
    //console.log(args[myUsername][0])
    console.log("yes")
    timerM = clearInterval(timerM)
    curtime = Date.now()
    theta = Math.atan((mouseY - center_y) / (mouseX - center_x)) * 180 / Math.PI
    let i = 1
    let smallest = [0, getCenterDistance(args[0][0], args[0][1], mouseX, mouseY)]
    while (i < args.length) {
      let distance = getCenterDistance(args[i][0], args[i][1], mouseX, mouseY)
      if (distance < smallest[1]) {
        smallest[0] = i
        smallest[1] = distance
      }
      i++
    }
    args.push([args[smallest[0]][0], args[smallest[0]][1], Math.pow(Math.sqrt(args[smallest[0]][2] / Math.PI) / 2, 2) * Math.PI])
    timerM = setInterval(shoot, 1000, args, smallest)
    //console.log(mouseX)
    //console.log(mouseY)
  })
}

var shoot = (args, smallest) => {
  if (Date.now() - curtime > 5000) {
    timerM = clearInterval(timerM)
  }
  else {

  }
}

addEventListener("mousemove", function(e) {
  var rect = c.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
  //mouseX = e.mouseX;
  //mouseY = e.mouseY;
})
