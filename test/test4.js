var users = { // user: [xcor, ycor, area]
  "X": [
    [250, 250, 10],
    [100, 100, 30]
  ],
  "Y": [
    [100, 100, 10],
  ],
  "A": [
    [250, 250, 8]
  ],
  "Z": [
    [400, 300, 20],
    [50, 50, 30]
  ]
};

var agar = [ // [xcor, ycor]
  [100, 100, 17],
  [8, 3, 3],
  [2, 4, 1]
];

var viruses = [ // user: [xcor, ycor, area]
  [225, 225, 10],
  [225, 225, 15],
  [375, 275, 20]
];

// allows all changes that need to be made to data to occur
// call at the end of each move
function update(user) {
  console.log("Users: " + JSON.stringify(users));

  // determines eating between users
  for (let k in users) {
    console.log("On user " + k);
    if (k != user) {
      for (let l in users[user]) {
        // console.log(users[user][l]);
        for (let m in users[k]) {
          console.log(m);
          console.log(users[k][m]);
          if (
            // determines if one cell of user is eating one of other user
            isEating(
              // users[user][l] <- example syntax to retrieve value
              users[user][l][0], users[user][l][1], users[user][l][2],
              users[k][m][0], users[k][m][1], users[k][m][2]
            )
          ) // updates if so
          {
            console.log(user + "[" + l + "]" + " eating " + m + "[" + l + "]");
            users[user][l][2] += .9 * users[k][m][2];
            // deletes eaten cell
            delete users[k][m];
            // if cell attributes are empty, deletes cell
            users[k] = users[k].filter(Boolean);
            console.log("Users: " + JSON.stringify(users));
          }
          // determines if one cell of other user is eating one of user
          else if (
            isEating(
              // users[user][0] <- example syntax to retrieve value
              users[k][m][0], users[k][m][1], users[k][m][2],
              users[user][l][0], users[user][l][1], users[user][l][2]
            )
          ) // updates if so
          {
            console.log(k + "[" + m + "]" + " eating " + user + "[" + l + "]");
            users[k][m][2] += .9 * users[user][l][2];
            // deletes eaten cell
            delete users[user][l];
            // if cell attributes are empty, deletes cell
            users[user] = users[user].filter(Boolean);
            console.log("Users: " + JSON.stringify(users));
            // if users[user][l] deleted stops iterating through different
            // users[k][m] to look for interactions with that users[user][l]
            // since it is null (not required)
            break;
          }
        }
      }
      // Deletes users with no cells on map from dictionary
      if (users[user].length == 0) {
        delete users[user];
      }
      if (users[k].length == 0) {
        delete users[k];
      }
    }
  }

  // determines eating with agar
  for (let i in users[user]) {
    for (let k in agar) {
      // determines if any agar close enough to eat
      if (
        isEatingAgar(
          users[user][i][0], users[user][i][1], users[user][i][2],
          agar[k][0], agar[k][1], agar[k][2]
        )
      )
      // updates if so
      {
        users[user][i][2] += agar[k][2];
        delete agar[k];
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

// checks if user A is eating
function isEating(xcorA, ycorA, areaA, xcorB, ycorB, areaB) {
  // eats if ineracting and
  console.log("Interacting? " + isInteracting(xcorA, ycorA, areaA, xcorB, ycorB, areaB));
  if (isInteracting(xcorA, ycorA, areaA, xcorB, ycorB, areaB)) {
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
// as long as two cells are close enough to touch, eating will occur
function isEatingAgar(xcorA, ycorA, areaA, xcorB, ycorB, areaB) {
  var distance = getCenterDistance(xcorA, ycorA, xcorB, ycorB);
  console.log("Distance: " + distance)
  // gives distance close enough for interaction (wrong rn)
  var close = getRadius(areaA) + getRadius(areaB);
  console.log("Radius A: " + getRadius(areaA));
  console.log("Radius B: " + getRadius(areaB));
  console.log("Close: " + close);
  if (distance <= close) {
    return true;
  }
  else {
    return false;
  }
}
