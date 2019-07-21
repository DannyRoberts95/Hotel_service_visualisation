export let selectedReviewId = null;
export default p => {
  let data_objects;
  let bubble_maps = [];
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
    const categroy_data = data.map(item => {
      if (item.Category !== "Facilities_Service") {
        return item.Category;
      } else {
        return "facilities";
      }
    });
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
    p.randomSeed(2);
    p.smooth();

    const gutter = 100;
    const mapSize = (p.height - gutter * 3) / 2;

    bubble_maps = [];
    bubble_maps.push(
      new Bubble_map(
        gutter,
        gutter,
        mapSize,
        mapSize,
        data_objects.sentiment_data,
        p.color(15, 0, 25),
        p.color(15, 25, 100),
        "Sentiment",
        "The percentage of selected reviews who's senitment was labled as negative or positve."
      )
    );
    bubble_maps.push(
      new Bubble_map(
        mapSize + gutter * 2,
        gutter,
        mapSize,
        mapSize,
        data_objects.categroy_data,
        p.color(50, 100, 75),
        p.color(20, 100, 80),
        "Review Category",
        "The percentge of selected reviews that pertain to each category."
      )
    );
    bubble_maps.push(
      new Bubble_map(
        mapSize * 2 + gutter * 3,
        gutter,
        mapSize,
        mapSize,
        data_objects.roomType_data,
        p.color(75, 50, 75),
        p.color(125, 100, 100),
        "Room Type",
        "The percentge of selected reviews that pertain to each type of room."
      )
    );
    bubble_maps.push(
      new Bubble_map(
        gutter,
        mapSize + gutter * 2,
        mapSize,
        mapSize,
        data_objects.reviewerScore_data,
        p.color(150, 50, 50),
        p.color(180, 100, 100),
        "Review Score",
        "The percentge of selected reviews that recieved each possible score out of 10."
      )
    );
    bubble_maps.push(
      new Bubble_map(
        mapSize + gutter * 2,
        mapSize + gutter * 2,
        mapSize,
        mapSize,
        data_objects.type_data,
        p.color(200, 50, 50),
        p.color(250, 100, 100),
        "Trip Purpose",
        "The percentage of selected reviews that pertain to each purpose for the reviwers trip."
      )
    );
    bubble_maps.push(
      new Bubble_map(
        mapSize * 2 + gutter * 3,
        mapSize + gutter * 2,
        mapSize,
        mapSize,
        data_objects.type1_data,
        p.color(290, 100, 50),
        p.color(340, 100, 100),
        "Group Type",
        "The percentage of selected reviews that pertain to the type of group the reviewer was a part of."
      )
    );
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //SKETCH DRAW
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  p.draw = function() {
    p.background(15);
    for (var i = 0; i < bubble_maps.length; i++) {
      let item = bubble_maps[i];
      item.run();
    }
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //BUBBLE MAP CLASS
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  class Bubble_map {
    constructor(x, y, w, h, data, col1, col2, title, description) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.gutter = 2;
      this.title = title;
      this.description = description;
      this.data = data;

      this.color1 = col1;
      this.color2 = col2;

      this.bubbleData = [];
      this.bubbles = [];

      this.calculateBubbleData();
      this.calculateBubbleLocations();
    }

    run() {
      p.push();
      p.translate(this.x, this.y - 25);
      // p.noFill();
      // p.stroke(100);
      // p.strokeWeight(1);
      // p.rect(0, 0, this.w, this.h);

      p.fill(100);
      p.noStroke();
      p.textAlign(p.LEFT);
      p.textFont("Helvetica", 18);
      p.text(this.title, 0, 20);
      p.textFont("Helvetica", 12);
      p.text(this.description, 0, this.h + 50, this.w);

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

      let maxValue = 0;
      for (let i = 0; i < valueCount.length; i++) {
        maxValue += valueCount[i];
      }

      for (let i = 0; i < value.length; i++) {
        let item = value[i];
        let itemCount = valueCount[i];
        let x = p.random(this.x, this.x + this.w);
        let y = p.random(this.y, this.y + this.h);

        let mapArea = this.w * this.h;
        let percentSize = p.map(itemCount, 0, maxValue, 0, 1);

        let area = mapArea * percentSize;
        let r = p.sqrt(area / 3.14) * 0.6;

        let lerpAmm = p.map(i, 0, value.length - 1, 0, 1);
        if (!lerpAmm && lerpAmm !== 0) lerpAmm = 0.5;
        let interCol = p.lerpColor(this.color1, this.color2, lerpAmm);

        let b = {
          x: x,
          y: y,
          r: r,
          percentage: Math.round(percentSize * 100),
          color: interCol,
          data: item
        };
        this.bubbleData.push(b);
      }
      this.bubbleData.sort((a, b) => (a.percentage > b.percentage ? -1 : 1));
    }
    calculateBubbleLocations() {
      for (let i = 0; i < this.bubbleData.length; i += 0) {
        let item = this.bubbleData[i];
        let r = item.r;
        let rx = p.random(this.x + r, this.w + this.x - r);
        let ry = p.random(this.y + r, this.h + this.y - r);

        rx = p.constrain(
          rx,
          this.x + this.gutter + r,
          this.w + this.x - r - this.gutter
        );
        ry = p.constrain(
          ry,
          this.y + this.gutter + r,
          this.h + this.y - r - this.gutter
        );

        let newBubble = new Bubble(
          rx,
          ry,
          r,
          item.percentage,
          item.color,
          this.bubbleData[i].data
        );
        let intersecting = false;

        for (let ii = 0; ii < this.bubbles.length; ii++) {
          let b = this.bubbles[ii];
          let d = p.dist(newBubble.x, newBubble.y, b.x, b.y);

          if (d < newBubble.r + this.gutter + b.r + this.gutter) {
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
    constructor(x, y, r, p, c, data) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.rDisplayPercent = 0;
      this.percentage = p;
      this.color = c;
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

      this.rDisplayPercent += 0.1;
      this.rDisplayPercent = p.constrain(this.rDisplayPercent, 0, 1);
      let radius = p.lerp(0, this.r, this.rDisplayPercent);

      p.fill(this.color, 50);
      p.noStroke();
      p.ellipse(0, 0, radius * 2, radius * 2);

      let word = `${this.data.toUpperCase()}`;
      let percent = this.percentage;
      percent < 1 ? (percent = "<1%") : (percent = `${percent}%`);
      p.textFont("Helvetica", 100);
      let textW = p.textWidth(word);
      let fontSize = (100 * (this.r * 2 * 0.65)) / textW;
      // fontSize = p.min(fontSize, this.r * 2 * 0.65);
      fontSize = 12;
      // fontSize = p.constrain(fontSize, 14, 100);
      p.textFont("Helvetica", fontSize);
      p.textAlign(p.CENTER, p.CENTER);
      p.noStroke();
      p.fill(100);
      p.text(word, 0, 0);
      fontSize = 10;
      p.text(percent, 0, 18);
      p.textFont("Helvetica", fontSize / 2);

      p.pop();
    }
  }
};
