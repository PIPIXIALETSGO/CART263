/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/

var vertical = 225;
var horizontal = 90;

var board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
function setup() {
  createCanvas(900, 900);
  background(0);
  strokeWeight(5);
  stroke(255);
  line(0, 300, 900, 300);
  line(0, 600, 900, 600);

  line(300, 0, 300, 900);
  line(600, 0, 600, 900);
  textSize(200);
}

/**
Description of draw()
*/
function draw() {
  for (var ii = 0; ii < 3; ii++) {
    horizontal = 80;
    for (var jj = 0; jj < 3; jj++) {
      text(board[ii][jj], horizontal, vertical);
      horizontal += 300;
    }
    vertical += 300;
  }
}
function mouseClicked() {
  if (mouseX > 0 && mouseX < 300) {
    console.log(board);
    board[0][0] = "X";
    board[0][1] = "X";
    board[0][2] = "X";
  }
}
