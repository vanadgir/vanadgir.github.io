class Food {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, random(0.6, 1.3));
  }

  fall() {
    this.position.add(this.velocity);
    this.position.y = constrain(this.position.y, 0, height);
  }

  display(){
    colorMode(RGB);
    fill(100, 58, 19);
    ellipse(this.position.x, this.position.y, 8, 8);
    colorMode(HSB);
  }
}
