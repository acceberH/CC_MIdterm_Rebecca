// constants
let c;
let s;
let boxs = []; // array for storing boxes
const WIDTH = 800;
const HEIGHT = 800;
// setup canvas
function setup() {
  createCanvas(WIDTH, HEIGHT);
  rectMode(CENTER);
}

// draw to canvas per frame
function draw() {
  background(0);
  if (frameCount%50==0) {
    c=color(0, 250, 0);
    s=2;
  } else {
    c=color(255, 81, 232);
    s=1;
  }
  if (frameCount%10==0) {
    //if (boxs.size()<24) {
    boxs.push(new box(c,s));
    console.log("new box added!");
    //}
  }
  //println(boxs.size());
  for (let i=0; i<boxs.length; i++) {
    b = boxs[i];
    b.show();
    b.move();
  }
}

class box {
  constructor(color, speed) {
    this.color = color;
    this.speed = speed;
    this.theta = 45;
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
  }
  show() {
    noFill();
    stroke(this.color);
    push();
    translate(this.x, this.y);
    rotate(radians(this.theta));
    let size=map(this.theta, 45, 0, 50, 800);
    strokeWeight(this.speed);
    rect(0, 0, size, size);
    pop();
  }
  move() {
    this.theta-=0.2;
    if (this.theta<0) {
      // TODO disappear boxes when it's outside canvas?
      // boxs.remove(this);
      // boxs = boxs.splice(boxs.indexOf(this), 1);
      // return;
    }
  }
}