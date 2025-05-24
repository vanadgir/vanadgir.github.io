function getRandomSpeed(){
  const speed = random(-1.5, -0.5);
  return createVector(0, speed);
}

class Target {
  constructor(id, center) {
    this.id = id;
    this.center = center;
    this.speed = getRandomSpeed();
    this.size = 8;
    this.health = 150;
    this.fill;
    this.isInside = false;
  }

  onScreen(){
    const xinside = (this.center.x >= 0 && this.center.x <= width);
    const yinside = (this.center.y >= 0 && this.center.y <= height);

    return xinside && yinside;
  }

  update(){
    this.center.add(this.speed);

    if(this.isInside) {
      this.fill = color(0, 200, 0);
    } else {
      this.fill = color(0, 0, 200);
    }

    if(this.center.y < 0) {
      this.center.y = random(height, height*2);
      this.speed = getRandomSpeed();
      SCORE += 1;
    }
  }

  insideRadius(s) {
    if (dist(s.center.x, s.center.y, this.center.x, this.center.y) < s.visionRadius) {
      this.isInside = true;
    } else {
      this.isInside = false;
    }
  }

  show(){
    fill(this.fill);
    stroke(this.fill);
    ellipse(this.center.x, this.center.y, this.size*2, this.size*2);
  }

}
