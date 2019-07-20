export let selectedReviewId = null;
export default p => {
  let data_objects;
  let bubbles;
  let earliestDate, latestDate;
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //HANDLES THE ARRIVAL OF NEW PROPS INTO THE SKETCH FROM REACT
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    props.data ? (data_objects = props.data) : (data_objects = {});
    props.sendId ? (this.sendId = props.sendId) : (this.sendId = null);
    props.earliestDate
      ? (this.earliestDate = props.earliestDate)
      : (this.earliestDate = null);
    props.latestDate
      ? (this.latestDate = props.latestDate)
      : (this.latestDate = null);
    p.setup();
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
    for (let i = 0; i < bubbles.length; i++) {
      if (
        p.dist(p.mouseX, p.mouseY, bubbles[i].loc.x, bubbles[i].loc.y) <
        bubbles[i].radius
      ) {
        const b = bubbles[i];
        selectedReviewId = b.reviewId;
        this.sendId(selectedReviewId);
        break;
      } else selectedReviewId = null;
    }
  };

  p.preload = function() {
    // bubbles = data_objects.map((item, i) => {
    //   const positive = item.Positive_Negative === "Positive" ? true : false;
    //   return new Bubble(
    //     item.entryID,
    //     p.random(350, p.width - 350),
    //     p.random(100, p.height - 100),
    //     positive,
    //     5
    //   );
    // });
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //SKETCH SETUP
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.cursor(p.CROSS);
    p.randomSeed(10);

    bubbles = data_objects.map((item, i) => {
      const positive = item.Positive_Negative === "Positive" ? true : false;
      const x = p.map(
        Date.parse(item.Review_Date),
        Date.parse(this.earliestDate),
        Date.parse(this.latestDate),
        50,
        p.width - 50
      );
      const y = p.map(item.Reviewer_Score, 0, 10, p.height - 50, 50);

      const noise = 10;
      const noiseX = p.random(-noise, noise);
      const noiseY = p.random(-noise, noise);
      return new Bubble(item.entryID, x + noiseX, y + noiseY, positive, 2);
    });
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //SKETCH DRAW
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.draw = function() {
    p.background(10);

    for (let i = 0; i < bubbles.length; i++) {
      // bubbles[i].update();
      bubbles[i].render();
    }
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
      p.stroke(this.color);
      p.strokeWeight(0.5);
      p.noFill();
      p.ellipse(this.loc.x, this.loc.y, this.radius * 2, this.radius * 2);
    }
  }
};
