let cx, cy, dx, dy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
let img; // Declare variable 'img'.
let xImgTram = 0

function setup() {
  //création zone dessin sur toute la page
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  img = loadImage('./Img/Tram.png'); // Load the image
  frameRate(20)

  let radius = min(200, 200) / 2;

  //proportionalité de l'horloge si changement de taille
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;


  //coordonnés de l'horloge a aiguille
  cx = width - 150
  cy = 150;
  // heure digitale
  dx = width - 230
  dy = 300

}

function draw() {
  background(255);
  drawClock()
  drawDigitalClock()
  let yImgTram = 600
  xImgTram += 7
  if (xImgTram > 1000) {
    xImgTram = 1000
  }

  //rectancle
  stroke(0, 0, 0)
  strokeWeight(10)
  fill(0, 200, 0)
  rect(900, yImgTram - 90, 350, 175, 20)
  // Displays the image at point (0, height/2) at half size
  image(img, xImgTram, yImgTram, img.width / 2, img.height / 2);


}

// A voir!
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function drawDigitalClock() {
  textSize(40)
  text(hour() + ":" + minute() + ":" + second(), dx, dy)
}

function drawClock() {

  // Draw the clock background
  noStroke();
  fill(244, 122, 158);
  ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill(237, 34, 93);
  ellipse(cx, cy, clockDiameter, clockDiameter);

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock
  stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  // Draw the minute ticks
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();
}



  //afficher le temps qu'il reste avant la prochaine fin de cloture 17h30
