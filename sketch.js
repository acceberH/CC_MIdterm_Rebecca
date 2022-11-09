// constants
let c;
let s;
let boxs = []; // array for storing boxes

let index=1;
let balls = [];

let stars = [];
let speed=0;
let angle=0;
let anglespeed=0;

const WIDTH = 800;
const HEIGHT = 800;
// setup canvas
function setup() {
  createCanvas(WIDTH, HEIGHT);
  rectMode(CENTER);
  for (let i=0; i<500; i++) {
    balls.push(new ball());
  }
  for (let i=0; i<1200; i++) {
    stars.push(new Star());
  }
}

// draw to canvas per frame
function draw() {
  if (index==1) {
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
      boxs.push(new box(c, s));
      console.log("new box added!");
      //}
    }
    for (let i=0; i<boxs.length; i++) {
      b = boxs[i];
      b.show();
      b.move();
    }
  } else if (index==2) {
    noStroke();
    fill(67, 67, 77, 20);
    rect(width/2, height/2, width, height);
    for (let i=0; i<balls.length; i++) {
      b = balls[i];
      b.move();
    }
  } else if (index==3) {
    fill(0, 100);
    rect(width/2, height/2, width, height);
    angle+=anglespeed;
    speed=map(mouseX, 0, width, 0, 30);
    anglespeed=map(mouseX, 0, width, 0.00, 0.09);
    translate(width/2, height/2);
    for (let i=0; i<stars.length; i++) {
      s = stars[i];
      s.show();
      s.move();
    }
  }
}
function keyPressed() {
  if (key=='1') {
    background(0);
    index=1;
  } else if (key=='2') {
    background(0,75,65);
    index=2;
  } else if (key=='3') {
    background(0);
    index=3;
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
      //boxs.remove(this);
      //boxs = boxs.splice(boxs.indexOf(this), 1);
      // return;
    }
  }
}
class ball {
  constructor() {
    this.x=width/2;
    this.y=height/2;
    this.theta=radians(random(360));
    this.thetaped=radians(random(0.1, 0.5));
    this.pedget=this.thetaped;
    this.w=random(10, 300);
    this.wget=this.w;
    this.alpha=random(40, 200);
    this.c=color(random(0, 255), random(0, 255), random(0, 255));
  }
  move() {
    noStroke();
    fill(this.c, this.alpha);
    ellipse(this.x+cos(this.theta)*this.w, this.y+sin(this.theta)*this.w, 1, 1);
    if (mouseIsPressed) {
      this.w=map(mouseX, 0, width, this.wget*0.8, this.wget*1.5);
      this.thetaped=map(mouseY, 0, height, this.pedget, this.pedget*5);
    }
    this.theta+=this.thetaped;
  }
}
class Star {
  constructor() {
    this.x=random(-width, width);
    this.y=random(-height, height);
    this.z=random(width);
    this.c=color(random(255), random(255), random(255));
  }
  show() {
    let sx=map(this.x/this.z, 0, 1, 0, width);
    let sy=map(this.y/this.z, 0, 1, 0, height);
    let r=map(this.z, 0, width, 16, 0);
    noStroke();
    fill(this.c);
    ellipse(sx, sy, r, r);
  }
  move() {
    this.z-=speed;
    if (this.z<1) {
      this.z=random(width);
    }
  }
}