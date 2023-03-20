let y;

// The statements in the setup() function
// execute once when the program begins
function setup() {
  createCanvas(400, 400);
  stroke(255);
  noLoop();
  y = height * 0.5;
  x = width / 2;
}

// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again. 
function draw() {
  background(0);
  x = x - 4;
  y = y - 4;
  if(x < 0){
    x=width
  }
  if (y < 0) {
    y = height;
  }
  line(x,0,x,height)
  line(0, y, width, y);
  setTimeout(draw,1000);
}

function calcul(){
  let calcul = 0
  for(i=0;i<10;i++){
    calcul += 2
    console.log(calcul)
  }
}
calcul()
