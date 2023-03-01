var mapimg;
var clat = 0;
var clon = 0;
var lat = 45.469738;
var lon = -73.744919;
var h = 512;
var w = 1024;
var zoomLevel = 1;
function preload() {
  mapimg = loadImage(
    "https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,+" +
      zoomLevel +
      ",0,0/" +
      w +
      "x" +
      h +
      "?access_token=pk.eyJ1Ijoia2FtaWthemUwMTI3IiwiYSI6ImNsYXJrdzBwNjF0emszcXQ3MmZ1bjRoZG4ifQ.nS9fB0QiYirUcHbyfWoXnA"
  );
}

function mercX(lon) {
  lon=radians(lon)
  var a = (256 / PI) * pow(2, zoomLevel);
  var b = lon + PI;
  return a * b;
}
function mercY(lat) {
    lat=radians(lat)
  var a = (256 / PI) * pow(2, zoomLevel);
  var b = tan(PI/4+lat/2)
  var c= PI-log(b)
  return a * c;
}
function setup() {
  createCanvas(w, h);
  translate(width/2,height/2)
  imageMode(CENTER) 
  image(mapimg, 0, 0);
  var cx=mercX(clon)
  var cy= mercY(clat)
  var x=mercX(lon)-cx
  var y=mercY(lat)-cy
  fill(97,1,27,200)
  ellipse(x,y,5,5)
}

function draw() {}
