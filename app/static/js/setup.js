var c = document.getElementById("game"); // Get canvas
var ctx = c.getContext("2d"); // Get canvas context

const socket = io("ws://localhost:3000")
const myUsername = "X"; // immutable