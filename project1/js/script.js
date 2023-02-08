var ball;
var test;
var num = 100;
var d;
var angle = 0;
var size = 10;
var counter = 0;
/*    Initialize all the variables   */
var x = 0;
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
  mouseX = -1000;
  mouseY = -1000;
}
function draw() {
  // background(255, 10);
  background(0, 10);
  x += 0.008;
  if (size < 400) {
    /*As time passes, the size of the circle gets bigger(maximum 400)*/
    size = time / 10;
  } else size = 400;
  time++;
  /* reset all particles to the center and display */
  for (var ii = 0; ii < num; ii++) {
    ball[ii].update();
    ball[ii].display();
  }
}
class Ball {
  constructor() {
    /* initialize all particle value  */
    this.x = random(0, width);
    this.y = random(0, height);
    this.xVel = random(0.5, -0.5);
    this.yVel = random(0.5, -0.5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.radius = random(1, 300);
    this.luck = random(0, 1);
    this.size = random(2, 15);
    this.di = random(2 * PI);
    this.sp = random(3, 5);
    this.si = random(1, 10);
    this.acc = random(0.005, -0.005);
    this.color = random(100);
    this.duration = random(1300, 1500);
    this.pY = random(0, height);
    this.checkColor = false;
  }
  update() {
    d = dist(this.x, this.y, mouseX, mouseY); //detect the distance between cursor and particle distance
    if (d < size - 10) {
      this.x = mouseX + this.radius * cos(angle); //change cursor to a spining circle, all of particles who are close to it will be placed at random point of the radius
      this.y = mouseY + this.radius * sin(angle);
      angle += 0.05;
      this.checkColor = true;
    } else if (d > size && d < size + 7) {
      this.x += sin(this.di) * this.sp; // Inspired by handsoup, https://openprocessing.org/sketch/1788531
      this.y += cos(this.di) * this.sp;
      this.di += 0.07;
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
        //some particles will be assigned to do certain actions
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
  display() {
    noStroke(); //give color and shape to the particles
    if (this.checkColor) {
      fill(this.r, this.g, this.b);
    } else {
      fill(this.color);
    }
    ellipse(this.x, this.y, this.size);
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
