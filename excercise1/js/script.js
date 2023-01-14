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
var counter = 0;
var player = ["X", "O"];
var currPlayer;
var xScore=0
var yScore=0
var winner=false
var board = [
  [" ", "", " "],    //[0][0],[0][1],[0][2]
  ["", " ", ""],     //[1][0],[1][1],[1][2]
  ["", " ", ""],     //[2][0],[2][1],[2][2]
];
var score = "0";
function setup() {
  createCanvas(900, 1100);
  background(0);
  strokeWeight(5);
  stroke(255);
  line(0, 300, 900, 300);
  line(0, 600, 900, 600);
  strokeWeight(10);
  line(0, 900, 900, 900);

  strokeWeight(5);

  line(300, 0, 300, 900);
  line(600, 0, 600, 900);
}

/**
Description of draw()
*/
function draw() {

  textSize(200);

  vertical = 225;
  for (var ii = 0; ii < 3; ii++) {
    horizontal = 80;
    for (var jj = 0; jj < 3; jj++) {
      text(board[ii][jj], horizontal, vertical);
      horizontal += 300;
    }
    vertical += 300;
  }
  checkResult();
  textSize(100);
  displayMessage()
  textSize(50);
  text('X',50,950)
  text('Y',250,950)
  text('Y',250,950)
  textSize(80);
  text(':',155,1060)
  text(xScore,50,1065)
  text(yScore,250,1065)
  
}
function mouseClicked() {
  if (counter % 2 === 0) {
    currPlayer = player[0];
  } else {
    currPlayer = player[1];
  }

  if (mouseX > 0 && mouseX < 300) {
    if (mouseY > 0 && mouseY < 300) {
      board[0][0] = currPlayer;
    }
    if (mouseY > 300 && mouseY < 600) {
      board[1][0] = currPlayer;
    }
    if (mouseY > 600) {
      board[2][0] = currPlayer;
    }
  }
  if (mouseX > 300 && mouseX < 600) {
    if (mouseY > 0 && mouseY < 300) {
      board[0][1] = currPlayer;
    }
    if (mouseY > 300 && mouseY < 600) {
      board[1][1] = currPlayer;
    }
    if (mouseY > 600) {
      board[2][1] = currPlayer;
    }
  }
  if (mouseX > 600) {
    if (mouseY > 0 && mouseY < 300) {
      board[0][2] = currPlayer;
    }
    if (mouseY > 300 && mouseY < 600) {
      board[1][2] = currPlayer;
    }
    if (mouseY > 600) {
      board[2][2] = currPlayer;
    }
  }
  counter++;
}
function checkResult() {
    for(var ii=0;ii<3;ii++){
        if (board[ii][0] === board[ii][1] && board[ii][0] === board[ii][2]) {
            winner=true
          }
          if (board[0][ii] === board[1][ii] && board[0][ii] === board[2][ii]) {
            winner=true
          }
    }
    if(board[0][0] === board[1][1]&&board[0][0] === board[2][2]){
        winner=true
    }
    if(board[2][0] === board[1][1]&&board[2][0] === board[0][2]){
        winner=true
    }
}
function displayMessage(){
    if(winner){
        text(currPlayer + "  won", 550, 1050);
        setTimeout(resetGame,2000);
    }
}
function resetGame(){
    console.log('wow')
    winner=false
    counter=0
     board = [
        [" ", "", " "],  
        ["", " ", ""],   
        ["", " ", ""],   
      ]
     
}
