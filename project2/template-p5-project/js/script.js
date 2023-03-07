var mapimg;
var clat = 0; //center latitude
var clon = 0; //center longtitude
var h = 512; //height
var w = 1024; //width
var zoomLevel = 0.9;
var airport = [];
var api_key =
  "pk.eyJ1Ijoia2FtaWthemUwMTI3IiwiYSI6ImNsYXJrdzBwNjF0emszcXQ3MmZ1bjRoZG4ifQ.nS9fB0QiYirUcHbyfWoXnA";
var routesData;
var numOfData = 5000; //total particles number
function preload() {
  routesData = loadJSON("./assets/US.json"); //load local Json file
  mapimg = loadImage(
    //request a static map from mapbox
    "https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,+" +
      zoomLevel +
      "/" +
      w +
      "x" +
      h +
      "?access_token=" +
      api_key
  );
}

function setup() {
  createCanvas(w, h);
  translate(width / 2, height / 2); //translate all the elements to the center
  imageMode(CENTER); // interprets the second and third parameters of image() as the image's center point
  image(mapimg, 0, 0);
  var cx = mercX(clon);
  var cy = mercY(clat);
  for (var ii = 0; ii < numOfData; ii++) {
    var data = routesData[ii]; //extract individual oject from a collection of objects
    var fromLon = data.from_long; //extract all the info that I need from the file
    var fromLat = data.from_lat;
    var toLon = data.to_long;
    var dist = data.distance;
    var toLat = data.to_lat;
    var fromCountry=data.from_country
    var toCountry=data.to_country
    var fromX = mercX(fromLon) - cx;
    var fromY = mercY(fromLat) - cy;
    var toX = mercX(toLon) - cx;
    var toY = mercY(toLat) - cy;
    airport[ii] = new Airport(fromX, fromY, toX, toY, dist,fromCountry,toCountry); //create particles and put them inside of an array
  }
}

function draw() {
  background(0, 4.5);
  translate(width / 2, height / 2);
  labelDisplay()

  // image(mapimg, 0, 0);
  for (var ii = 0; ii < numOfData; ii++) {
    //loop through all the particles
    airport[ii].show();
    airport[ii].update();
  }
}
function labelDisplay(){
  fill(107, 193, 250);
  rect(400,190,10,10)
  fill(250, 88, 70)
  rect(400,210,10,10)
  textSize(8)
  fill(255,255,255,59)
  text('National',413,198)
  text('International',413,218 )
  textSize(15)
  text('All flight routes to US',-60,-225)

}
//following 2 functions are from Coding Train on youtube, https://www.youtube.com/watch?v=ZiYdOwOrGyc&t=1022s
//They are web mercator for web mapping, it scales the map to fit your screen size
function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoomLevel);
  var b = lon + PI;
  return a * b;
}
function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoomLevel);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}
//particles
class Airport {
  constructor(from_lon, from_lat, to_lon, to_lat, dist,fromC,toC) {
    this.startX = from_lon;
    this.startY = from_lat;
    this.endX = to_lon;
    this.endY = to_lat;
    this.x = this.startX;
    this.y = this.startY;
    this.dist = dist;
    this.fromCountry=fromC
    this.toCountry=toC
    //calculate the x distance and y distance between two points
    this.xDistance = this.endX - this.startX;
    this.yDistance = this.endY - this.startY;
    this.pct = 0;
    this.step = 0.001;
    //map some variables based on the distance between two cities
    this.exponent =5;
    this.startTime = random(0, 100); //each airplane has a random delay to take off
    this.blinkTime = 0;
    this.return = false;
    this.size = 3;
    this.blink = false;
    this.sizeChange = -0.1;
    this.takeOff = false;
  }
  update() {
    //start a timer
    this.startTime += 0.01;
    if (this.startTime > 100) {
      //when timer reaches 100, it starts a new timer for airports
      this.blink = true;
      this.blinkTime += 0.8;
      if (this.blinkTime > 100) {
        //when blink timer reaches 100,the dot(airport) will start to blink for few seconds
        this.blink = false;
        this.takeOff = true;
        this.pct += this.step;
        //following calculation are from p5.js examples, https://p5js.org/examples/motion-moving-on-curves.html
        //it makes an object moves along the curve
        if (this.pct < 1) {
          //when pct is less than 1, it means the airplane is flying towards their destination
          if (!this.return) {
            //to make airplane can fly back and forth between two points.Whenever it arrives, swap the coordinates of them
            this.xDistance = this.endX - this.startX;
            this.yDistance = this.endY - this.startY;
            this.x = this.startX + this.pct * this.xDistance;
            this.y =
              this.startY + pow(this.pct, this.exponent) * this.yDistance;
          } else {
            this.xDistance = this.startX - this.endX;
            this.yDistance = this.startY - this.endY;
            this.x = this.endX + this.pct * this.xDistance;
            this.y = this.endY + pow(this.pct, this.exponent) * this.yDistance;
          }
        } else {
          //whenever pct reaches 1, it means it has arrived. reset the timer and some variables
          this.startTime = random(0, 100);
          this.pct = 0;
          this.return = !this.return;
          this.takeOff = false;
        }
      }
    }
  }
  show() {
    //make the dots blink by changing its size between 4 to 1
    if (this.blink) {
      this.size += this.sizeChange;
      if (this.size > 4 || this.size < 1) {
        this.sizeChange = -this.sizeChange;
      }
      fill(249, 252, 171);
      ellipse(this.startX, this.startY, this.size, this.size);
    }
    noStroke();
    if (this.takeOff) {
      //if the airplane is ready to fly, display the color and shape of each particle
      if(this.fromCountry===this.toCountry){
        fill(107, 193, 250);
      }else{
        fill(250, 88, 70);
        
      }
      ellipse(this.x, this.y, 1, 1);
      // if the x distance between 2 points is a positive number, it means that it's coming from left to right,vice versa
      // so the airplanes will always facing the right direction based on this number
      // if (this.xDistance>0) {
      //   // Airplane body
      //   ellipse(this.x, this.y, 12, 2);
      //   // Airplane wing on the top
      //   triangle(
      //     this.x - 1,
      //     this.y,
      //     this.x + 2.3,
      //     this.y,
      //     this.x - 3,
      //     this.y - 5
      //   );
      //   // // Airplane wing on the bottom
      //   triangle(
      //     this.x - 1,
      //     this.y,
      //     this.x + 2.3,
      //     this.y,
      //     this.x - 3,
      //     this.y + 5
      //   );
      //   // // Airplane tail
      //   triangle(
      //     this.x - 6.5,
      //     this.y - 0.3,
      //     this.x - 4,
      //     this.y,
      //     this.x - 7,
      //     this.y + 2
      //   );
      //   triangle(
      //     this.x - 6.5,
      //     this.y - 0.3,
      //     this.x - 4,
      //     this.y,
      //     this.x - 7,
      //     this.y - 2
      //   );
      // } else {
      //   // Airplane body
      //   ellipse(this.x, this.y, 12, 2);
      //   // Airplane wing on the top
      //   triangle(
      //     this.x - 1,
      //     this.y,
      //     this.x + 2.3,
      //     this.y,
      //     this.x + 3,
      //     this.y - 5
      //   );
      //   // // Airplane wing on the bottom
      //   triangle(
      //     this.x - 1,
      //     this.y,
      //     this.x + 2.3,
      //     this.y,
      //     this.x + 3,
      //     this.y + 5
      //   );
      //   // // Airplane tail
      //   triangle(
      //     this.x + 6.5,
      //     this.y - 0.3,
      //     this.x + 4,
      //     this.y,
      //     this.x + 7,
      //     this.y + 2
      //   );
      //   triangle(
      //     this.x + 6.5,
      //     this.y - 0.3,
      //     this.x + 4,
      //     this.y,
      //     this.x + 7,
      //     this.y - 2
      //   );
      // }
    }
  }
}
