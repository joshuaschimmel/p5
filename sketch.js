
//canvas variables
let canvas; //the canvas itself
let backgroundColor = "#46435A"; //current color for background
let start; // start of canvas
let i = 0; // global variable for iteration
let drawList = []; //list of objects to be drawn
//drawable space in x-Direction of the animation (not window)
//this is not a const because the necessary variables are
//accesible until p5 has done its thing
let maxDrawSpace = 0;
let drawerList = [];
let radius = 200;
let positionList = [];


//canvas constants
const dotSize = 25;//size of the dots
const dotNumber = 100;
//original fill color(green)
//const fillColor = "#f1c40f";
//original border color (dark green)
//const borderColor = "#27ae60";
//collection of colors from flatUI
const flatColors = ["#2ecc71", "#3498db", "#9b59b6",
"#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1"];
const redrawBackground = true;

//constants for oscillation
const freq = 20; //frequency
const max = 150; //maximum elongation
const speed = 0.5; //speed along x-axis
const angle = 90; //angle of the x-axis

//different drawer
let hoursDrawer;
let minutesDrawer;
let secondsDrawer;

let count = 0; //counter


//TODO-List
//TODO: UI-Elements
//TODO: class/obj drawspace mapping its own drawspace onto canvas
//TODO: Define a set max x-distance for dots to move around on
//initial start point for animation
//TODO: Defaults
/*TODO: find out what this is doing
if (object.hasOwnProperty(drawables)) {

}*/

function preload(){
};

function setup(){
  //setup canvas and its properties
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");

  //setup draw mode
  background(backgroundColor);
  fill("#ecf0f1");//some base fill color
  noStroke();//borderless dots
  //flatUI mode
  //colorMode(RGB, 255);
  //rainbow mode
  colorMode(HSB, dotNumber); //HSB max val depending on max # of dots

  //attempt at creating a new draw space for neg. coordinates
  maxDrawSpace = (sqrt(sq(width)+sq(height)) + (2 * dotSize))/2;
  start = createVector((width / 2), height /2);



  //generate drawable objects and their start positions
  const dist = maxDrawSpace/dotNumber;
  for (let i = 0; i < dotNumber; i++) {
    let xPos = start.x + dist * i;
    let yPos = start.y; //+ oscillation(xPos);
    //flatUI mode
    //let newDot = new Dot(xPos, yPos, dotSize, randomArrayElement(flatColors));
    //rainbow mode
    let newDot = new Dot(createVector(xPos, yPos), dotSize, color(i, 100, 100));
    drawList.push(newDot);
  }

  //clockface
  /*
  radius = width > height ? height/3 : width/3;
  textSize(48);
  for (let i = 0; i <= 11; i++) {
    let rotation = (TWO_PI / 12) * i;
    let vec = calcClockPos(radius, rotation, start);

    positionList.push({
      rot: rotation,
      val: i+1,
      pos: vec
    });
  }
  */


  /*
  for(let i = 0; i< 4; i++){
    let randomSpeed = Math.random() * (0.3 - 0.001) + 0.01;
    let randomFreq = Math.random() * (25 -  15) + 15;
    let randomStartAngle = Math.random() * (360-0) + 0;
    let direction = Math.random() < 0.5 ? -1 : 1;
    let randomAnimationAngle = direction * Math.random() * (0.0005-0.0001) + 0.0001;
    let newDrawer = new DrawSinus(
      start, drawList, maxDrawSpace,
      randomSpeed, freq, randomStartAngle,
      max, 0);
    drawerList.push(newDrawer);
  }*/

  //initialize drawers
  hoursDrawer = new DrawSinus(
    start, drawList, maxDrawSpace,
    speed, freq, 0,
    max, 0);
  minutesDrawer = new DrawSinus(
    start, drawList, maxDrawSpace,
    speed, freq, 0,
    80, 0);
  secondsDrawer = new DrawSinus(
    start, drawList, maxDrawSpace,
    speed, freq, 0,
    30, 0);
};

function draw () {
  //repaint background to remove previous paintings
  if(redrawBackground) background(backgroundColor);

  /*
  colorMode(HSB, 100);
  count++;
  count = count % 100;
  fill(color(count,100,100));
  for (number of positionList) {
    number.rot += 0.03;
    let newVec = calcClockPos(radius, number.rot, start);
    number.pos = newVec;
    text(number.val, number.pos.x, number.pos.y);
  }*/


  //get current date
  let date = new Date();
  //get dates in radians using min-max normalization
  //v' = ((v-min)/(max-min))*(newMax - newMin) + newMin
  let hours = ((date.getHours() / 11) * TWO_PI) - HALF_PI;
  let minutes = ((date.getMinutes() / 59) * TWO_PI) - HALF_PI;
  let seconds = ((date.getSeconds() / 59) * TWO_PI) - HALF_PI;
  hoursDrawer.setRotation(hours);
  minutesDrawer.setRotation(minutes);
  secondsDrawer.setRotation(seconds);
  hoursDrawer.drawDrawables();
  minutesDrawer.drawDrawables();
  secondsDrawer.drawDrawables();


  /*
  for (drawer of drawerList) {
    drawer.drawDrawables();
  }*/
  //fill(color(count,100,100));
  //ellipse(start.x, start.y, 30);

};

function mousePressed(){
  remove();
};

// https://www.leifiphysik.de/mechanik/mechanische-schwingungen/sinusfunktion
// y(t) = amplitude * sin(freq * t + phase)
// x: point around which to oscillate
// t: time step
/*function oscillation(x){
  return max * Math.sin(x / freq);
};*/


//returns a random element from an array
//in this case a color from the flatUI-list
/**
* Blab bla Bla
* @param {Array} array, die Beschreibung
* @returns {Object} rnd Element des Arrays
*/
function randomArrayElement(array){
  return array[Math.floor(Math.random() * array.length)]
};


function calcClockPos(radius, rot, start){
  let vec = createVector(1,1);
  vec.normalize();
  vec.rotate(rot);
  vec.normalize();
  vec.mult(radius);
  vec.add(start);
  return vec;
}
