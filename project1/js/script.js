var ball;
var test;
var num = 200;
var loc, vel, acc, d;
var angle = 0;
var a = 200;
var b = 200;
var size = 10;
var counter = 0;
var secondForm = false;
var firstTime = true; /*    Initialize all the variables   */
var radius, period, amplitude, sineEl;
var period = 5;
var x = 0;
var force = 6;
var time = 0;
function preload() {}
function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball(); //Initialize the object
  mouseX = -1000;
  mouseY = -1000;
  noStroke();
  background(0);
  for (var ii = 0; ii < num; ii++) {
    //Create all the particles and put them in an array
    ball[ii] = new Ball();
  }
}

function mousePressed() {
  //Whenever mouse is pressed, change some variables to different value
  firstTime = false;
  mouseX = -1000;
  mouseY = -1000;
}
function keyPressed() {
  secondForm = !secondForm;
}
function draw() {
  background(0, 10);
  x += 0.008;
  if (size < 400) {
    /*As time passes, the size of the circle gets bigger(maximum 400)*/
    size = time / 10;
  } else size = 400;

  if (firstTime) {
    /* If it's the first time running the code, call this function, otherwise start the timer  */
    thirdForm();
  } else {
    time++;
    /* reset all particles to the center and display */
    for (var ii = 0; ii < num; ii++) {
      if (counter < num) {
        ball[ii].initialization();
      } else {
        ball[ii].update();
      }
      ball[ii].display();
    }
  }
}
/* Translate particles to the center and display  */

function thirdForm() {
  push();
  translate(width / 2, height / 2);
  for (var ii = 0; ii < num; ii++) {
    ball[ii].display();
  }
  pop();
  for (var ii = 0; ii < num; ii++) {
    ball[ii].update2();
  }
}
class Ball {
  constructor() {
    /* initialize all particle value  */
    this.x = random(200);
    this.y = random(200);
    this.xVel = random(2, -2);
    this.yVel = random(2, -2);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.radius = random(1, 300);
    this.luck = random(0, 1);
    this.size = random(2, 15);
    this.di = random(2 * PI);
    this.sp = random(3, 5);
    this.si = random(1, 10);
    this.acc = random(0.05, -0.05);
    this.duration = random(1300, 1500);
    this.pY = random(0, height);
    this.xAcc = 0;
    this.yAcc = 0;
  }
  update() {
    d = dist(this.x, this.y, mouseX, mouseY); //detect the distance between cursor and particle distance
    if (d < size - 10) {
      //absorb the ones who are close to the cursor
      if (secondForm) {
        var sine = sin((2 * PI * x) / period + this.pY); //makes all the particle running inside of a sphere
        amplitude = sqrt(sq(300) - sq(abs(mouseY - this.pY))); //found this code on openprocessing, made some changes on value so it can be adapted to my code
        sineEl = mouseX + sine * amplitude; //credit to jamie, https://openprocessing.org/sketch/1752095
      } else {
        this.x = mouseX + this.radius * cos(angle); //change cursor to a spining circle
        this.y = mouseY + this.radius * sin(angle);
        angle += 0.05;
      }
    } else if (d > size && d < size + 7) {
      this.x += sin(this.di) * this.sp; //I found this part on openprocessing, I took a very small part from thier code and
      this.y += cos(this.di) * this.sp; //change it a bit.So it will look like some particles get sucked in, and some run away from the cursor
      this.di += 0.07; // Credit to handsoup, https://openprocessing.org/sketch/1788531
      this.si += 0.8;
    } else {
      if (this.x > width || this.x < 0) {
        //whenever a particle hits the edge, bounce back
        this.xVel = -this.xVel;
      }
      if (this.y < 0 || this.y > height) {
        this.yVel = -this.yVel;
      }
      if (this.luck > 0.4) {
        if (this.duration > 950) {
          //some particles act differently than others, they have a random timer to do certain things
          this.y += this.yVel;
          this.x += this.xVel;
        } else if (this.duration > 870 && this.duration < 950) {
          //some particles will jiggle for a second
          this.x = random(this.x - 1, this.x + 1);
          this.y = random(this.y - 1, this.y + 1);
        } else if (this.duration > 800 && this.duration < 870) {
          //then accelerate
          this.xVel += this.acc;
          this.yVel += this.acc;
          this.y += this.yVel;
          this.x += this.xVel;
        } else if (this.duration < 800 && this.duration > 1) {
          this.y += this.yVel;
          this.x += this.xVel;
        } else if (this.duration <= 0) {
          //reset duration whenever it reaches 0
          this.duration = random(1000, 1500);
        }
      } else {
        this.y += this.yVel;
        this.x += this.xVel;
      }
      this.duration -= 1;
    }
  }
  update2() {
    //making particles spin around the center, because I've used
    this.xAcc = (force * -0.1 * this.x) / dist(0, 0, this.x, this.y); //tranlate in thirdForm function, so 0,0 is the center coordinate
    this.yAcc = (force * -0.1 * this.y) / dist(0, 0, this.x, this.y);
    this.xVel += this.xAcc;
    this.yVel += this.yAcc;
    this.x += this.xVel;
    this.y += this.yVel;
  }
  display() {
    noStroke(); //give color and shape to the particles
    fill(this.r, this.g, this.b);
    if (secondForm) {
      if (sineEl > 10) rect(sineEl, this.pY, 10);
    } else {
      ellipse(this.x, this.y, this.size);
    }
  }
  initialization() {
    //reposition particles to the center and reset its velocity
    this.x = width / 2;
    this.y = height / 2;
    this.xVel = random(2, -2);
    this.yVel = random(2, -2);
  }
}
//////////////////////////////////////////////////////////test particle//////////////////////////////////////////////
// class Test{
//   constructor(){
//     this.x=random(100)
//     this.y=random(100)
//     this.xVel=random(10)
//     this.yVel=random(10)

//     this.r = random(255);
//     this.g = random(255);
//     this.b = random(255);
//   }
//   update(){
//       this.xAcc=force*-1*this.x/dist(0,0,this.x,this.y)
//       this.yAcc=force*-1*this.y/dist(0,0,this.x,this.y)
//       this.xVel+=this.xAcc
//       this.yVel+=this.yAcc
//       this.x+=this.xVel
//       this.y+=this.yVel
//   }
//   display(){
//     fill(this.r, this.g, this.b);
//     rect(this.x,this.y,10)
//   }
// }
