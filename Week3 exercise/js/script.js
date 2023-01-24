let ball; // Declare object
function setup() {
  createCanvas(1000, 1000);
  ball = new Particle();
}
function draw() {
  background(200, 50, 100);
  ball.move()
  ball.display();
}
class Particle {
  constructor() {
    this.x = random(0,width);
    this.y = random(0,height);
  }
  move(){
      this.y=this.y+random(1,-1)
      this.x=this.x+random(1,-1)
  }
  display() {
    ellipse(this.x, this.y, 50);
  }
}
