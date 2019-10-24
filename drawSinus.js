
/**This class holds a list of drawable objects and draws them into
its own 2d coordinate-space, whith the origin being at the top left.
It holds the function whith which to determine the y-value for any
given x >= 0. This class also knows function with which it can
transform coordinates from the space it is placed in into its
own system, allowing it to be placed anywhere
*/
class DrawSinus{
  constructor(position, drawablesList = [],length = 500,
    speed = 0.25, frequency = 20, angle = 0, height = 150, rot = 0.0001){
    angleMode(RADIANS);
    this.pos = position;
    this.drawables = drawablesList;
    this.maxDrawLength = length;
    this.maxElongation = height;
    this.speed = speed;
    this.freq = frequency;
    this.angle = radians(angle);
    this.start = {x:0, y:0};
    this.rotation = rot;
  }

  //returns the (linear) transformation of this space
  //(from normal canvas space into this objects space)
  getTransformation(){
    return createVector(this.pos.x, this.pos.y);
  }

  /**
  Sets the rotation of the central axis of this sinus curve.
  @param {int} rad angle in radians
  */
  setRotation(rad){
    this.angle = rad;
  }

  //lets all drawables draw themselves
  //1. calculate position
  //2. draw object
  drawDrawables(){
    for (let drawable of this.drawables) {
      this.angle += this.rotation;
      //get current position (on x-axis) of the object
      let currentVec = drawable.pos.copy();
      //compute the next position given speed
      let newX = (currentVec.x + speed) % maxDrawSpace;
      let newY = this.oscillation(newX);
      //update position of the object with a fresh vector
      drawable.pos = createVector(newX, newY);
      //use other vector to calculate correct position to draw the object
      currentVec.set(newX, newY);
      //1. rotation
      currentVec.rotate(this.angle);
      //2. transformation
      currentVec.add(this.pos);
      //draw the object at the calculated position
      drawable.drawAt(currentVec);

    }
  }

  //not a real oscillation function but rather a wrapper for a
  //sinus function
  oscillation(x){
    return this.maxElongation * Math.sin(x / freq);
  }

}



//returns a random element from an array
//in this case a color from the flatUI-list
function randomArrayElement(array){
  return array[Math.floor(Math.random() * array.length)]
};
