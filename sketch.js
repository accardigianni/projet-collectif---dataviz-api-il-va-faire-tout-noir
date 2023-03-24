//Projet :
//Il va faire tout noir !
//By: 
//- Elsa
//- Gianni
//- Florian


//déclaration variable globale
let cx, cy, dx, dy;     //variable pour les differentes horloges


//Horloge
let secondsRadius;
let minutesRadius;      // Horloge a aiguilles
let hoursRadius;
let clockDiameter;      //Taille horloge
let delta;              //différence entre heure de maintenant et heure de cloture


//Déclaration des images globales
let imgTram;
let imgRail
let imgArret
let imgClock;
let imagePokemondraw    //Fait appel a l'API pokemon


//Coordonée mobile du tram
let xImgTram = 0


//Récuperation donnée API Tan
let passage1 = "Vide"
let direction1 = "Vide"
let passage2 = "Vide"
let direction2 = "Vide"


//Confition pour le tram qui repart
let buffer = 0


//------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------Déclaration des fonctions------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//Clocks

function drawDigitalClock() {
  textSize(40)
  strokeWeight(2);      //Mise en page
  stroke(0)
  fill(0, 200, 0)

  let dHour = hour();
  let dMin = minute();      //Stockage fonctions native P5 pour l'heure
  let dSec = second();

  //Mise en forme : 00:00:00
  if (dHour < 10) {
    dHour = "0" + hour()
  }
  if (dMin < 10) {
    dMin = "0" + minute()
  }
  if (dSec < 10) {
    dSec = "0" + second()
  }

  text(dHour + ":" + dMin + ":" + dSec, dx, dy)       //affichage
}

function drawClock() {
  // Draw the clock background
  noStroke();
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
}

function closure() {
  let closureTime = (new Date('Janvier 1, 1970 17:00:00')).getTime()
  let nowTime = (new Date()).getTime()
  delta = new Date(closureTime - nowTime)
}

//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//Pokemon

function buttonPokemon() {
  let button;
  imagePokemondraw = ""
  button = createButton('animal totem');    //Création bouton
  button.position(100, 150);
  button.mouseClicked(changePokemon);       //Action avec appel de fonction
}

const changePokemon = async () => {  //Fonction fléchée
  let randomNumber = Math.ceil(Math.random() * 150) + 1   // .random=> nombre [0, 149,99] + .ceil => plafone la valeur entière au dessus
  let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;// on fait +1 a la fin pour éviter le 0(no pokemon)

  let data = await fetch(requestString)         //Appel API
  let dataOK = await data.json()                //Reponse traduite en Json
  let imagePokemon = dataOK.sprites.other.dream_world.front_default     //Récuperation avec chemin d'acces dans l'objet pour l'image
  //renvoie l'image
  imagePokemondraw = loadImage(imagePokemon)      //Chargement image
}

function drawPokemon() {
  if (imagePokemondraw) {
    image(imagePokemondraw, 70, 300, imagePokemondraw.width / 2, imagePokemondraw.height / 2)     //Affichage du pokemon sans erreur quand rien dans la variable
  }
}

//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//Tram et Arret

async function reseauTan() {
  const response = await fetch('https://open.tan.fr/ewp/tempsattente.json/MOUT')    //Appel API Tan
  const tram = await response.json()        //Traduction pour comprehension de la reponse
  passage1 = tram[0].temps
  direction1 = tram[0].terminus             //Stockage donnnée API dans variable globale
  passage2 = tram[1].temps
  direction2 = tram[1].terminus
  console.log(passage1 + " vers " + direction1)
  console.log(passage2 + " vers " + direction2)
  setTimeout(reseauTan, 10000)        //Ré-execution toutes les 10sec
}


function drawTram() {
  let yImgTram = 600          //Position Y fixe
  if (passage1 != "proche" && !buffer) {
    xImgTram = -600
  } else if (passage1 == "proche") {
    xImgTram += 5
    if (xImgTram > 570) {             //Premier mouvement du tramway jusqu'a l'arret
      buffer = 1
      xImgTram = 570
    }
  } else if (passage1 != "proche" && buffer) {
    xImgTram += 5
    if (xImgTram == 2500) {           //Départ tramway de l'arret
      xImgTram = -600
      buffer = 0
    }
  }

  //Rail autour arret de tram
  let xRail = 0                 //Coordonée de base du premier rail
  for (let i = 0; i < 35; i++) {
    image(imgRail, xRail, 550, 50, 50)      //Rail du haut
    xRail += 50
  }
  image(imgArret, 600, yImgTram - 90, 350, 175, 20)
  image(imgAda, 713, 568, 28, 34)
  xRail = 0
  for (let i = 0; i < 35; i++) {
    image(imgRail, xRail, 650, 50, 50)      //Rail du bas
    xRail += 50
  }

  image(imgTram, xImgTram, yImgTram, imgTram.width / 2, imgTram.height / 2)       //Image du tram en mouvement
}

function drawWait() {
  textSize(13)
  noStroke()
  fill(0)                       //Affichage temps attente
  text("  " + passage1 + "\n" + "  vers" + "\n" + direction1, 600, 495)
  text(" " + passage2 + "\n" + "  vers" + "\n" + direction2, 850, 495)
}

function drawNameArret() {
  stroke(0)
  strokeWeight(4)
  fill(0, 200, 0)               //Cadre vert derriere le nom de l'arret
  rect(662, 455, 172, 55)
  noStroke()
  textSize(25)
  fill(0, 0, 0)                 //Nom arret dans le cadre
  text("Moutonnerie", 680, 490)
}

//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//Titre de la page

function drawTitle() {
  fill(0, 200, 0)
  textSize(40)
  textFont('Helvetica');      //Police d'écriture
  stroke(3)
  strokeWeight(1)
  text("Ada Tech School", 70, 35)
  textSize(20)
  fill(220, 10, 50)
  text("Cloture dans " + (delta.getHours()) + "h" + (delta.getMinutes()) + "m" + (delta.getSeconds()) + "s", 70, 75)
  if (delta.getHours() == 0 || delta.getHours() > 8) { //peut-etre rajouetr des conditions pour les minutes si on veut se prendre la tete
    textSize(30)
    text("Time to get away !", 70, 110)
  }

}

//------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------Fonctions natives P5.JS
//------------------------------------------------------------------------------------------------------------------------------------------------

function setup() {
  //création zone dessin sur toute la page
  createCanvas(windowWidth, windowHeight);          //Création feuille de dessin

  let radius = min(200, 200) / 2;                   //NE PAS TOUCHER SOUS PEINE DE MORT

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

  //appel du button
  buttonPokemon()
}


function draw() {             //Execution 60 fois par seconde
  background(255);
  drawClock()
  drawDigitalClock()
  closure()
  drawNameArret()
  drawTram()
  drawTitle()
  drawWait()
  drawPokemon()

}

//Appels en dehors de draw() pour eviter l'execution 60 fois par seconde

reseauTan()