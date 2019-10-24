let radius = 200;
let positionList = [];
let start;
let canvas;

function setup(){
  //setup canvas and its properties
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");


  //point in the middle of the window
  start = createVector(width / 2, height /2);
  radius = width > height ? height/3 : width/3;
  textSize(32);
  for (let i = 0; i <= 11; i++) {
    let rotation = (TWO_PI / 12) * i;
    let vec = calcClockPos(radius, rotation, start);

    positionList.push({
      rot: rotation,
      val: i+1,
      pos: vec
    });
  }
}

function draw(){
  for (number of positionList) {
    number.rot += 0.1;
    let newVec = calcClockPos(radius, number.rot, start);
    number.pos = newVec;
    text(number.val, number.pos.x, number.pos.y);
  }
  fill(color(20,100,100));
  ellipse(start.x, start.y, 15);
}

function mousePressed(){
  remove();
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
