let ball = [];
let ball2 = [];
let num = 1;
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var ii = 0; ii < num; ii++) {
    //   ball[ii] = new Particle();
    ball2[ii] = new Particle2();
  }
}
function draw() {
  background(97, 1, 27);
  for (var ii = 0; ii < num; ii++) {
    //   ball[ii].display();
    // if (mouseIsPressed) {
    //   if(ball2[ii].delete(mouseX, mouseY)){
    //     ball2.splice(ii,1)
    //   }
    // }
    ball2[ii].display();

  }
}
function keyPressed() {
  num +=    1;
  ball2[ball2.length] = new Particle2();
}
function mousePressed() {}
// class Particle {
//   constructor() {
//     this.x = random(0,width);
//     this.y = random(0,height);
//   }
//   update(){
//     fill(map(this.y,0,height,0,255),map(this.y,0,height,0,255),map(this.y,0,height,0,255))
//   }
//   display() {
//     this.speed=map(mouseX,0,1000,0,10)
//     this.x+=random(-this.speed,this.speed)
//     this.y+=random(-this.speed,this.speed)
//     fill(255)
//     rect(this.x, this.y, 10,10);
//   }
// }
class Particle2 {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.xSpeed = random(-5, 5);
    this.ySpeed = random(-5, 5);
    this.size = random(10, 20);
    this.alpha = 255;
  }
  display() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.x >= width) {
      this.xSpeed = -this.xSpeed;
    } else if (this.x <= 0) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y > height) {
      this.ySpeed = -this.ySpeed;
    } else if (this.y <= 0) {
      this.ySpeed = -this.ySpeed;
    }
    fill(map(this.y, 0, height, 0, 255));
    ellipse(this.x, this.y, this.size);
  }
  delete(mouseX, mouseY) {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d <= 10) {
        return true
      }
  }
}
