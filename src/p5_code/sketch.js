// import Bubble from "./Bubble.js";

export default function sketch(p) {
  let data_objects;
  let bubbles;

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    props.data ? (data_objects = props.data) : (data_objects = {});
    p.setup();
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.redraw();
  };

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 100);

    bubbles = data_objects.map((item, i) => {
      const positive = item.Positive_Negative === "Positive" ? true : false;
      const radius = p.map(item.Reviewer_Score, 0, 10, 2, 6);
      return new Bubble(
        p.random(100, p.width - 100),
        p.random(100, p.height - 100),
        positive,
        2.5
      );
    });
  };

  p.draw = function() {
    p.randomSeed(1);
    p.background(10);

    // for (let i = 0; i < bubbles.length; i++) {
    //   bubbles[i].update();
    //   bubbles[i].render();
    // }

    p.fill(95);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(100);
    p.text(data_objects.length, p.width / 2, 0 + 100);
    p.textSize(25);
    p.text(p.int(p.frameRate()), p.width - 100, 0 + 100);
  };

  class Bubble {
    constructor(x, y, positive, radius) {
      this.loc = p.createVector(x, y);
      this.color = positive
        ? p.color(p.random(100, 180), 100, 90, 100)
        : p.color(p.random(0, 50), 100, 90, 100);
      this.radius = radius;
    }

    run() {
      this.update();
      this.render();
    }

    update() {
      this.loc.add(p.createVector(p.random(-0.5, 0.5), p.random(-0.5, 0.5)));
    }

    render() {
      p.push();
      p.strokeWeight(this.radius * 2);
      p.stroke(this.color);
      p.point(this.loc.x, this.loc.y);
      p.pop();
    }
  }
}
