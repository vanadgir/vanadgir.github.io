class Bullet {
  constructor(center, speed) {
    this.center = center;
    this.speed = speed;
    this.offScreen = false;
    this.size = 5;
  }

  collidesWith(target) {
    const distance = dist(
      this.center.x,
      this.center.y,
      target.center.x,
      target.center.y
    );

    return distance < this.size + target.size;
  }

  update() {
    this.center.sub(this.speed);

    const xinside = this.center.x >= 0 && this.center.x <= width;
    const yinside = this.center.y >= 0 && this.center.y <= height;

    if (!xinside ||!yinside) {
      this.offScreen = true;
    }
  }

  show(){
    noStroke();
    fill(200, 0, 0);
    ellipse(this.center.x, this.center.y, this.size*2, this.size*2);
  }
}
