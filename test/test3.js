// Getting key presses
document.onkeydown = function(){arrowChange(true)};
document.onkeyup = function(){arrowChange(false)};

  function arrowChange(isDown) {
  // Create scheduler for each and have up key cancel
  var key = event.keyCode;
      switch (key) {
         case 37: case 38: case 39: case 40:
            if (isDown) {
              startMove("Test", key);
            }
            else {
              stopMove("Test", key);
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
        case 37:
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
        case 38:
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
        case 39:
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
        case 40:
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
