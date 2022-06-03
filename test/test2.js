var dict = { // user: [xcor, ycor, area]
  "X": [250, 250, 10],
  "Y": [100, 100, 30],
  "Z": [400, 300, 20]
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
  // gives distance close enough for interaction (wrong rn)
  var close = Math.min(
    getInnerRadius(areaA), getInnerRadius(areaB)
  );
  if (distance <= close) {
    return true;
  }
  else {
    return false;
  }
}

// is eating

// is eaten
