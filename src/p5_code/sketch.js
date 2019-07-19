export let selectedReviewId = null;
export default p => {
  let data_objects;
  let bubbles;

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //HANDLES THE ARRIVAL OF NEW PROPS INTO THE SKETCH FROM REACT
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    props.data ? (data_objects = props.data) : (data_objects = {});
    props.sendId ? (this.sendId = props.sendId) : (this.sendId = null);
    // p.setup();
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // RESIZE THE SKETCH ON WINDOW CHANGE
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.redraw();
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //MOUSE CLICK FUNCTIONALITY
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.mouseClicked = function() {
    const b = bubbles[p.floor(p.random(3, 10))];
    selectedReviewId = b.reviewId;
    this.sendId(selectedReviewId);
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //SKETCH SETUP
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    bubbles = data_objects.map((item, i) => {
      const positive = item.Positive_Negative === "Positive" ? true : false;
      return new Bubble(
        item.entryID,
        p.random(100, p.width - 100),
        p.random(100, p.height - 100),
        positive,
        2.5
      );
    });
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //SKETCH DRAW
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.draw = function() {
    // p.randomSeed(10);
    p.background(10);

    for (let i = 0; i < bubbles.length; i++) {
      // bubbles[i].update();
      bubbles[i].render();
    }
    p.fill(100);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(100);
    p.text(data_objects.length, p.width / 2, 0 + 100);
    p.textSize(25);
    p.text(p.int(p.frameRate()), p.width - 100, 0 + 100);
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //BUBBLE CLASS
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  class Bubble {
    constructor(reviewId, x, y, positive, radius) {
      this.reviewId = reviewId;
      this.loc = p.createVector(x, y);
      this.color = positive
        ? p.color(p.random(100, 150), 100, 90, 100)
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
      p.noStroke();
      p.fill(this.color);
      p.ellipse(this.loc.x, this.loc.y, this.radius * 2, this.radius * 2);
    }
  }
};
