var users = { // user: [xcor, ycor, area]
  "X": [250, 250, 10],
  "Y": [100, 100, 30],
  "Z": [400, 300, 20]
};

var agar = [ // [xcor, ycor]
  [5, 9],
  [8, 3],
  [2, 4]
];

var viruses = { // user: [xcor, ycor, area]
  "X": [225, 225, 10],
  "Y": [225, 225, 15],
  "Z": [375, 275, 20]
};

// allows all changes that need to be made to data to occur
// call at the end of each move
function update(user) {
  console.log("Users: " + JSON.stringify(users));
  for (let k in users) {
    console.log(k);
    if (k != user) {
      console.log("Users: " + JSON.stringify(users));
      // check if user eats other user
      if (
        isEating(
          // users[user][0] <- example syntax to retrieve value
          users[user][0], users[user][1], users[user][2],
          users[k][0], users[k][1], users[k][2]
        )
      ) // updates if so
      {
        users[user][2] += .9 * users[k][2];
        // delete object.keyname;
        delete users[k];
      }
      // check if other user eats user
      if (
        isEating(
          // users[user][0] <- example syntax to retrieve value
          users[k][0], users[k][1], users[k][2],
          users[user][0], users[user][1], users[user][2]
        )
      ) // updates if so
      {
        users[k][2] += .9 * users[user][2];
        // delete object.keyname;
        delete users.user;
      }
    }
  }
};

// gets radius associated with the cell's mass
function getRadius(area) {
  return Math.sqrt(
    area / Math.PI
  );
};

// gets the radius assosciated with 90% of the blob's mass
function getInnerRadius(area) {
  return Math.sqrt(
    .9 * area / Math.PI
  );
}

// gets distance between centers of two cells
function getCenterDistance(xcorA, ycorA, xcorB, ycorB) {
  return Math.sqrt(
    Math.pow((xcorA - xcorB), 2)
    +
    Math.pow((ycorA - ycorB), 2)
  );
}

// checks if close enough for interaction
function isInteracting(xcorA, ycorA, areaA, xcorB, ycorB, areaB) {
  var distance = getCenterDistance(xcorA, ycorA, xcorB, ycorB);
  console.log("Distance: " + distance)
  // gives distance close enough for interaction (wrong rn)
  var close = getInnerRadius(areaA) + getInnerRadius(areaB);
  console.log("Inner Radius A: " + getInnerRadius(areaA));
  console.log("Inner Radius B: " + getInnerRadius(areaB));
  console.log("Close: " + close);
  if (distance <= close) {
    return true;
  }
  else {
    return false;
  }
}

// checks if user A is eating a user or virus
function isEating(xcorA, ycorA, areaA, xcorB, ycorB, areaB) {
  // eats if ineracting and
  if (isInteracting) {
    // 90% userA mass is greater than or equal to userB mass
    if (.9 * areaA >= areaB) {
      return true;
    }
  }
  // returns false otherwise
  return false;
}

// // checks if user A is eaten (B is eating)
// // only called when B is a user
// function isEaten(xcorA, ycorA, areaA, xcorB, ycorB, areaB) {
//   if (isEatingUser(xcorB, ycorB, areaB, xcorA, ycorA, areaA)) {
//     return true;
//   }
//   return false;
// }

// checks if user A is eating agar
function isEatingAgar(xcorA, ycorA, areaA, xcorB, ycorB) {
  var distance = getCenterDistance(xcorA, ycorA, xcorB, ycorB);
  var radius = getRadius(areaA);
  if (radius <= distance) return true;
  return false;
}
