let cx, cy, dx, dy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
let imgTram;
let xImgTram = 0
let imgClock;


function drawDigitalClock() {
  textSize(40)
  stroke(0)
  fill(0, 200, 0)
  let dHour = hour();
  let dMin = minute();
  let dSec = second();
  if (dHour < 10) {
    dHour = "0" + hour()
  }
  if (dMin < 10) {
    dMin = "0" + minute()
  }
  if (dSec < 10) {
    dSec = "0" + second()
  }
  text(dHour + ":" + dMin + ":" + dSec, dx, dy)
}

function drawClock() {
  // Draw the clock background
  noStroke();
  fill(244, 122, 158);

  //ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill(237, 34, 93);
  //ellipse(cx, cy, clockDiameter, clockDiameter);
  image(imgClock, cx - 85, cy - 87, imgClock.width / 2, imgClock.height / 2)

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock
  stroke(0, 200, 0);
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

async function reseauTan() {
  const response = await fetch('https://open.tan.fr/ewp/tempsattente.json/MOUT')
  const tram = await response.json()
  let passage1 = tram[0].temps
  let direction1 = tram[0].terminus
  let passage2 = tram[1].temps
  let direction2 = tram[1].terminus
  console.log(tram)
  console.log(passage1 + " vers " + direction1)
  console.log(passage2 + " vers " + direction2)
  setTimeout(reseauTan, 10000)
}

const changePokemon = async () => {
  let randomNumber = Math.ceil(Math.random() * 150) + 1 // .random=> nombre [0, 149,99] + .ceil => plafone la valeur entière au dessus
  console.log("randomnumbder", randomNumber)
  let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;// on fait +1 a la fin pour éviter le 0(no pokemon)
  console.log("request", requestString)

  let data = await fetch(requestString)
  let dataOK = await data.json()
  console.log(dataOK.sprites.other.dream_world.front_default)
  let image = dataOK.sprites.other.dream_world.front_default
  console.log(dataOK)
  console.log("coucou")
  document.getElementById("poke").innerHTML = "<img src= \" " + image + "\" >"
}

function drawTram() {
  let yImgTram = 600
  xImgTram += 5
  if (xImgTram > 870) {
    xImgTram = 870
  }
  //Arret de tram bas de page
  stroke(0, 0, 0)
  strokeWeight(10)
  fill(0, 200, 0)
  image(imgArret, 900, yImgTram - 90, 350, 175, 20)
  //Affichage tram en mouvement
  image(imgTram, xImgTram, yImgTram, imgTram.width / 2, imgTram.height / 2)
}

function drawArret() {
  stroke(0)
  strokeWeight(4)
  fill(0, 200, 0)
  rect(962, 480, 172, 55)
  noStroke()
  textSize(25)
  fill(0, 0, 0)
  text("Moutonnerie", 980, 517)
}

function drawTitle() {
  textSize(40)
  textFont('Helvetica');
  stroke(3)
  strokeWeight(1)
  text("Ada Tech School", 70, 70)
  textSize(30)
  text("Time to get away !", 70, 110)
}

function setup() {
  //création zone dessin sur toute la page
  createCanvas(windowWidth, windowHeight);
  stroke(255);

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

  //création images
  imgTram = loadImage('./Img/merde.png')
  imgArret = loadImage('./Img/arret.png')
  imgClock = loadImage('./Img/horloge.png')
}

function draw() {
  background(255);
  drawClock()
  drawDigitalClock()
  drawArret()
  drawTram()
  drawTitle()
}

reseauTan()