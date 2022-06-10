const mapWidth = 10000;
const mapHeight = 10000;

const DEBUG = true;

var c = document.getElementById("game"); // Get canvas
var ctx = c.getContext("2d"); // Get canvas context

const socket = io("ws://localhost:3000")
const myUsername = user; // immutable
console.log(user);
socket.emit("updateFromClient", [myUsername, 250, 250, 10]); // init new user (change to random pos later)
