// Fish class definition
class Fish {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, random(-1,1));
    this.position = createVector(x, y);
    this.r = 8;
    this.maxspeed = 5;
    this.maxforce = 0.8;
    this.color = random(255);
    this.wanderTheta = 0;
  }

  // update location
  update() {
    // update vel with acc
    this.velocity.add(this.acceleration);
    // limit max speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // reset accel to 0 every cycle
    this.acceleration.mult(0);

    // keep within fishtank
    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);
  }

  // updating accel based on applied force
  applyForce(force) {
    // F = A when M = 1
    this.acceleration.add(force);
  }

  // wander when no food
  wander() {
    this.velocity.mult(0.3);
    let wanderPoint = this.velocity.copy();
    wanderPoint.setMag(100);
    wanderPoint.add(this.position);
    // circle(wanderPoint.x, wanderPoint.y, 16);

    let wanderRadius = 10;
    // noFill();
    // circle(wanderPoint.x, wanderPoint.y, wanderRadius*2);
    // line(this.position.x, this.position.y, wanderPoint.x, wanderPoint.y);

    let theta = this.wanderTheta + this.velocity.heading();

    let x = wanderRadius * cos(theta);
    let y = wanderRadius * sin(theta);
    wanderPoint.add(x,y);
    // circle(wanderPoint.x, wanderPoint.y, 8);
    // stroke(0);
    // line(this.position.x, this.position.y, wanderPoint.x, wanderPoint.y);

    let steer = wanderPoint.sub(this.position);
    steer.setMag(this.maxforce);
    this.applyForce(steer);

    let displaceRange = 0.9;
    this.wanderTheta += random(-displaceRange, displaceRange)
  }

  // eat behavior
  eat(list) {
    let searchRange = Infinity;
    let closest = -1;
    for (let i = 0; i < list.length; i++) {
      let d = this.position.dist(list[i].position);
      if (d < searchRange) {
        searchRange = d;
        closest = i;
      }
    }

    // if close to food, remove
    if (closest != -1 && searchRange < 8) {
      list.splice(closest, 1);
    } else if (closest != -1) {
      this.seek(list[closest].position);
    }
  }

  // steer towards target
  seek(target) {
    // vector from location to target
    let desired = p5.Vector.sub(target, this.position);

    // scale to max speed
    desired.setMag(this.maxspeed);

    // steer = desired - velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);

    this.applyForce(steer);
  }

  // render fish
  display() {
    // draw facing target
    let theta = this.velocity.heading() + PI / 2;
    fill(this.color, 255, 255);
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}
