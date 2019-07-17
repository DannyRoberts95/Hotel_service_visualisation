import p5 from "p5";

class Bubble {
  constructor(x, y, positive, radius) {
    this.x = x;
    this.x = y;
    this.color = positive
      ? p5.color(p5.random(100, 180), 100, 90)
      : p5.color(p5.random(0, 50), 100, 90);
    this.radius = radius;
  }

  run() {
    this.update();
    this.render();
  }

  update() {}

  render() {
    p5.pushMatrix();
    p5.translate(this.x, this.y);
    p5.stroke(this.radius);
    p5.point(0, 0);
    p5.popMatrix();
  }
}

export default Bubble;
