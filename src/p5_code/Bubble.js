import p from "p5";

export default class Bubble {
  constructor(x, y, r, data) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.data = data;
  }

  run() {
    this.render();
  }

  update() {}

  render() {
    p.push();
    p.translate(this.x, this.y);
    p.fill(15, 100, 100, 100);
    p.ellipse(0, 0, this.r * 2, this.r * 2);
    p.pop();
  }
}
