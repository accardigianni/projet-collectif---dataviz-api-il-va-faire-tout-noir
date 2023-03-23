let cx, cy, dx, dy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
let imgTram;
let xImgTram = 0
let passage1 = "Vide"
let direction1 = "Vide"
let passage2 = "Vide"
let direction2 = "Vide"
let buffer = 0
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
  endShape();
}
function buttonPokemon() {
  let button;
  imagePokemondraw = ""
  button = createButton('animal totem');
  button.position(100, 150);
  button.mouseClicked(changePokemon);
}

async function reseauTan() {
  const response = await fetch('https://open.tan.fr/ewp/tempsattente.json/MOUT')
  const tram = await response.json()
  passage1 = tram[0].temps
  direction1 = tram[0].terminus
  passage2 = tram[1].temps
  direction2 = tram[1].terminus
  console.log(tram)
  console.log(passage1 + " vers " + direction1)
  console.log(passage2 + " vers " + direction2)
  setTimeout(reseauTan, 10000)
}

function drawTime() {
  textSize(13)
  noStroke()
  fill(0)
  text("  " + passage1 + "\n" + "  vers" + "\n" + direction1, 600, 495)
  text(" " + passage2 + "\n" + "  vers" + "\n" + direction2, 850, 495)
}


const changePokemon = async () => {
  let randomNumber = Math.ceil(Math.random() * 150) + 1 // .random=> nombre [0, 149,99] + .ceil => plafone la valeur entière au dessus
  console.log("randomnumbder", randomNumber)
  let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;// on fait +1 a la fin pour éviter le 0(no pokemon)
  console.log("request", requestString)

  let data = await fetch(requestString)
  let dataOK = await data.json()
  console.log(dataOK.sprites.other.dream_world.front_default)
  let imagePokemon = dataOK.sprites.other.dream_world.front_default
  console.log(dataOK)
  console.log("coucou")


  //renvoie l'image
  loadImage(imagePokemon, img => {
    image(img, 300, 300)
  })
}

function drawTram() {
  let yImgTram = 600
  if (passage1 != "proche" && buffer == 0) {
    xImgTram = -600
  } else if (passage1 == "proche") {
    xImgTram += 5
    if (xImgTram > 570) {
      buffer = 1
      xImgTram = 570
    }
  } else if (passage1 != "proche" && buffer == 1) {
    xImgTram += 5
    console.log("coucou")
    if (xImgTram == 2500) {
      xImgTram = -600
      buffer = 0
    }
  }
  //Arret de tram bas de page
  stroke(0, 0, 0)
  strokeWeight(10)
  fill(0, 200, 0)
  image(imgArret, 600, yImgTram - 90, 350, 175, 20)
  image(imgAda, 713, 568, 28, 34)
  let xRail = 0
  for (i = 0; i < 50; i++) {
    image(imgRail, xRail, 650, 50, 50)
    xRail += 50
  }
  //Affichage tram en mouvement
  image(imgTram, xImgTram, yImgTram, imgTram.width / 2, imgTram.height / 2)
}

function drawArret() {
  stroke(0)
  strokeWeight(4)
  fill(0, 200, 0)
  rect(662, 455, 172, 55)
  noStroke()
  textSize(25)
  fill(0, 0, 0)
  text("Moutonnerie", 680, 490)
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
function drawPokemon() {
  stroke(0, 0, 0)
  strokeWeight(10)
  image(imagePokemondraw, 300, 300)
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
  imgTram = loadImage('./Img/tram.png')
  imgArret = loadImage('./Img/arret.png')
  imgAda = loadImage('./Img/ada.jpg')
  imgClock = loadImage('./Img/horloge.png')
  imgRail = loadImage('./Img/rail1.png')
  buttonPokemon()

}
reseauTan()
function draw() {
  background(255);
  drawClock()
  drawDigitalClock()
  drawArret()
  drawTram()
  drawTitle()
  drawTime()
}

