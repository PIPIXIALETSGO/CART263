// var table;
// function preload() {
//  table = loadTable("EVA_Data.csv", "csv", "header");
// }
// function setup() {
//  createCanvas(windowWidth, windowHeight);
//  background(0)
// fill(97,1,27)
//  console.log(table.getRowCount() + " total rows in table");
//  console.log(table.getColumnCount() + " total columns in table");
//  console.log(table.getColumn("Crew"));
//  // use a nested for loop to cycle through the table's cells
//  for (var r = 0; r < table.getRowCount(); r++){
// ellipse(random(0,width),random(0,height),parseInt(table.getString(r,5)*3))
//  }
// }

var table;
var duration = [];
var points = [];
function preload() {
  table = loadTable("EVA_Data.csv", "csv", "header");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  for (var r = 0; r < table.getRowCount(); r++) {
    // Cycle through each row of the table
    points[r] = new DataPoint(
      table.getString(r, 1),
      table.getString(r, 2),
      table.getString(r, 5),
      table.getString(r, 0)
    );
    points[r].drawBasic();
    points[r].arrangeFlight();
    // Pass through the values in each row
  }
}
class DataPoint {
  constructor(country, name, duration, ID) {
    // Add each data point to the object
    this.country = country;
    this.duration = duration;
    this.name = name;
    this.ID = ID;
    this.x;
    this.y;
  }
  drawBasic() {
    this.x = random(width);
    this.y = random(height);
    noStroke();
    if (this.country === "USA") {
      fill(97, 1, 27);
    } else fill(27, 1, 97);
    ellipse(this.x, this.y, 50);
    fill(255);
    textSize(10);
    text(this.name, this.x, this.y);
  }
  drawCircle() {}
  arrangeFlight() {
    this.duration = this.duration.split(":");
    // console.log(this.duration)
  }
}
