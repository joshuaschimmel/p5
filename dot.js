class Dot{
  constructor(vec, size, color) {
    this.pos = vec;
    this.size = size;
    this.color = color;
    //TODO add id for debugging
  }

  //dots are able to draw themselves
  doDraw() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  drawAt(position){
    noStroke();
    fill(this.color);
    ellipse(position.x, position.y, this.size);
  }
  getColor(){
    return color(this.color);
  }
}
