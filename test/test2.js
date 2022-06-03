// Getting key presses
document.onkeydown = function(){arrowChange(true)};
document.onkeyup = function(){arrowChange(false)};

  function arrowChange(isDown) {
  // Create scheduler for each and have up key cancel
      switch (event.keyCode) {
         case 37:
            console.log("Left key.");
            if (isDown) {
              startMove("Test", "L");
            }
            else {
              stopMove("Test", "L");
            }
            break;
         case 38:
            console.log("Up key.");
            if (isDown) {
              startMove("Test", "U");
            }
            else {
              stopMove("Test", "U");
            }
            break;
         case 39:
            console.log("Right key.");
            if (isDown) {
              startMove("Test", "R");
            }
            else {
              stopMove("Test", "R");
            }
            break;
         case 40:
            console.log("Down key.");
            if (isDown) {
              startMove("Test", "D");
            }
            else {
              stopMove("Test", "D");
            }
            break;
      }
   };

   var timerL;
   var timerU;
   var timerR;
   var timerD;

   function startMove(user, key) {
   	console.log("starting?" + user + key);
    changeTimer(user, key, true);
   }

   function move(user, key) {
     console.log("move" + user + key);
   }

   // stops metronome by clearing interval
   function stopMove(user, key) {
     console.log("stopping?");
     // console.log(timer);
     changeTimer(user, key, false);
   }

   function changeTimer(user, key, isStart) {
     switch (key) {
        case "L":
           if (isStart) {
             console.log("starting" + user + key);
             timerL = clearInterval(timerL);
             timerL = setInterval(move, 1, user, key);
           }
           else {
             console.log("stopping" + user + key);
             timerL = clearInterval(timerL);
           }
           break;
        case "U":
           if (isStart) {
             timerU = clearInterval(timerU);
             console.log("starting" + user + key);
             timerU = setInterval(move, 1, user, key);
           }
           else {
             console.log("stopping" + user + key);
             timerU = clearInterval(timerU);
           }
           break;
        case "R":
        if (isStart) {
          timerR = clearInterval(timerR);
          console.log("starting" + user + key);
          timerR = setInterval(move, 1, user, key);
        }
        else {
          console.log("stopping" + user + key);
          timerR = clearInterval(timerR);
        }
           break;
        case "D":
        if (isStart) {
          timerD = clearInterval(timerD);
          console.log("starting" + user + key);
          timerD = setInterval(move, 1, user, key);
        }
        else {
          console.log("stopping" + user + key);
          timerD = clearInterval(timerD);
        }
           break;
     }
   }
