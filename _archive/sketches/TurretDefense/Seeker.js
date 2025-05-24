class Seeker {
  constructor(center) {
    this.center = center;
    this.previousBullet = millis();
    this.velocity = createVector(random(1.5, 2), random(1.5, 2));
    this.size = 20;
    this.visionRadius = 200;
    this.SHOT_INTERVAL = 30;
    this.MIN_VISION = 50;
    this.MAX_VISION = 400;
    this.closest;
  }

  scan(targets) {
    let shortest = Infinity;
    let newClosest = null;

    for (let t of targets) {
      if (t.isInside & t.onScreen()) {
        let distance = dist(
          this.center.x,
          this.center.y,
          t.center.x,
          t.center.y
        );
        if (distance < shortest) {
          newClosest = t;
          shortest = distance;
        }
      }
    }

    this.closest = newClosest;
  }

  moveSeeker(mousePos) {
    let direction = mousePos.copy().sub(this.center);
    let distance = direction.mag();    
    if (distance > 5) {  
      direction.normalize();
      let speed = this.velocity.mag();
      let targetVelocity = direction.mult(speed);
      this.velocity = p5.Vector.lerp(this.velocity, targetVelocity, 1);
    }
  }

  fireBullet(target) {
    if (!this.closest) return;

    const currentTime = millis();

    if (currentTime - this.previousBullet > this.SHOT_INTERVAL) {
      const a = this.center.copy().sub(this.closest.center);
      const b = a.add(target.speed.copy());

      const aimOffset = random(1);

      bullets.push(
        new Bullet(
          this.center.copy(),
          a.add(b).normalize().mult(2.5).add(createVector(0, aimOffset))
        )
      );
      this.previousBullet = currentTime;
    }
  }

  update() {
    this.center.add(this.velocity);

    this.fireBullet(this.closest);

    if (this.center.x <= this.size || this.center.x >= width - this.size) {
      this.velocity.x *= -1;
    }

    if (this.center.y <= this.size || this.center.y >= height - this.size) {
      this.velocity.y *= -1;
    }
  }

  show() {
    for (let b of bullets) {
      b.update();
      b.show();
    }

    fill(255);
    noStroke();
    ellipse(this.center.x, this.center.y, this.size * 2, this.size * 2);

    noFill();
    stroke(255);
    ellipse(
      this.center.x,
      this.center.y,
      this.visionRadius * 2,
      this.visionRadius * 2
    );
  }
}
