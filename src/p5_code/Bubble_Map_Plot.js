export let selectedReviewId = null;
export default p => {
  let data_objects;
  let seniment_bubble_map,
    category_bubble_map,
    roomType_bubble_map,
    reviewerScore_bubble_map,
    type1_bubble_map,
    type_bubble_map;

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //HANDLES THE ARRIVAL OF NEW PROPS INTO THE SKETCH FROM REACT
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    props.data ? this.processData(props.data) : console.log("No new data.");

    p.setup();
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //HANDLES THE ARRIVAL OF NEW DATA
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.processData = function(data) {
    const sentiment_data = data.map(item => item.Positive_Negative);
    const categroy_data = data.map(item => item.Category);
    const reviewerScore_data = data.map(item =>
      p.floor(item.Reviewer_Score).toString()
    );
    const roomType_data = data.map(item => item.roomType);
    const type_data = data.map(item => item.type);
    const type1_data = data.map(item => item.type1);
    data_objects = {
      sentiment_data: sentiment_data,
      categroy_data: categroy_data,
      reviewerScore_data: reviewerScore_data,
      roomType_data: roomType_data,
      type_data: type_data,
      type1_data: type1_data
    };

    console.log(data_objects);
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
  p.mouseClicked = function() {};

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //SKETCH SETUP
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.cursor(p.CROSS);

    const mapSize = 400;

    seniment_bubble_map = new Bubble_map(
      25,
      25,
      mapSize,
      mapSize,
      data_objects.sentiment_data
    );
    category_bubble_map = new Bubble_map(
      450,
      25,
      mapSize,
      mapSize,
      data_objects.categroy_data
    );
    roomType_bubble_map = new Bubble_map(
      875,
      25,
      mapSize,
      mapSize,
      data_objects.roomType_data
    );
    reviewerScore_bubble_map = new Bubble_map(
      25,
      450,
      mapSize,
      mapSize,
      data_objects.reviewerScore_data
    );
    type_bubble_map = new Bubble_map(
      450,
      450,
      mapSize,
      mapSize,
      data_objects.type_data
    );
    type1_bubble_map = new Bubble_map(
      875,
      450,
      mapSize,
      mapSize,
      data_objects.type1_data
    );
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //SKETCH DRAW
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.draw = function() {
    p.background(10);
    seniment_bubble_map.run();
    category_bubble_map.run();
    roomType_bubble_map.run();
    reviewerScore_bubble_map.run();
    type_bubble_map.run();
    type1_bubble_map.run();
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //BUBBLE MAP CLASS
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  class Bubble_map {
    constructor(x, y, w, h, data) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.padding = 2;
      this.data = data;
      this.bubbleData = [];
      this.bubbles = [];
      console.log(data);
      this.calculateBubbleData();
      this.calculateBubbleLocations();
    }

    run() {
      p.push();
      p.translate(this.x, this.y);
      p.noFill();
      p.stroke(100);
      p.strokeWeight(1);
      p.rect(0, 0, this.w, this.h);
      p.pop();
      for (let i = 0; i < this.bubbles.length; i++) {
        let item = this.bubbles[i];
        item.run();
      }
    }

    calculateBubbleData() {
      let value = [];
      let valueCount = [];
      //create an array with all the seperate value in the data
      for (let i = 0; i < this.data.length; i++) {
        let item = this.data[i];
        if (value.includes(item) || item === "All") {
          continue;
        } else {
          value.push(item);
        }
      }

      for (let i = 0; i < value.length; i++) {
        valueCount[i] = 0;
      }
      //count the number of occurances for each value
      for (let i = 0; i < this.data.length; i++) {
        let item = this.data[i];
        let index = value.indexOf(item);
        valueCount[index]++;
      }

      // this.bubbleData = { value: value, valueCount: valueCount };
      let maxValue = 0;
      for (let i = 0; i < valueCount.length; i++) {
        maxValue += valueCount[i];
      }

      // console.log(maxValue);
      for (let i = 0; i < value.length; i++) {
        let item = value[i];
        let itemCount = valueCount[i];
        let x = p.random(this.x, this.x + this.w);
        let y = p.random(this.y, this.y + this.h);

        let mapArea = this.w * this.h;
        let percentSize = p.map(itemCount, 0, maxValue, 0, 1);
        let area = mapArea * percentSize;
        let r = p.sqrt(area / 3.14) * 0.5;

        let b = { x: x, y: y, r: r, data: item };
        this.bubbleData.push(b);
      }
    }
    calculateBubbleLocations() {
      for (let i = 0; i < this.bubbleData.length; i += 0) {
        let r = this.bubbleData[i].r;
        let rx = p.random(this.x + r, this.w + this.x - r);
        let ry = p.random(this.y + r, this.h + this.y - r);

        rx = p.constrain(
          rx,
          this.x + this.padding + r,
          this.w + this.x - r - this.padding
        );
        ry = p.constrain(
          ry,
          this.y + this.padding + r,
          this.h + this.y - r - this.padding
        );

        let newBubble = new Bubble(rx, ry, r, this.bubbleData[i].data);
        let intersecting = false;

        for (let ii = 0; ii < this.bubbles.length; ii++) {
          let b = this.bubbles[ii];
          let d = p.dist(newBubble.x, newBubble.y, b.x, b.y);

          if (d < newBubble.r + this.padding + b.r + this.padding) {
            intersecting = true;
            break;
          }
        }

        if (!intersecting && !this.bubbleData[i].spawned) {
          this.bubbles.push(newBubble);
          this.bubbleData[i].spawned = true;
          i++;
        }
      }
    }
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //BUBBLE CLASS
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  class Bubble {
    constructor(x, y, r, data) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.data = data;
      this.spawned = false;
    }

    run() {
      this.render();
    }

    update() {}

    render() {
      p.push();
      p.translate(this.x, this.y);
      p.fill(100);
      let word = this.data.toLowerCase();
      p.textFont("Helvetica", 100);
      let textW = p.textWidth(word);
      let fontSize = (100 * (this.r * 2 * 0.65)) / textW;
      fontSize = p.min(fontSize, this.r * 2 * 0.65);
      p.textFont("Helvetica", fontSize);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(word, 0, 0);
      p.textFont("Helvetica", fontSize / 2);
      p.noFill();
      p.stroke(100);
      p.strokeWeight(2);
      p.ellipse(0, 0, this.r * 2, this.r * 2);
      p.pop();
    }
  }
};
