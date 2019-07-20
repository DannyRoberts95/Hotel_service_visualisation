import p5 from "p5";
import Bubble from "./Bubble.js";

export default class Bubble_map {
  constructor(x, y, w, h, data) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.data = data;
    this.bubbleData = {};

    this.setvalue();
    console.log(this.bubbleData);
    this.calculateBubbleMap();
  }

  run() {}

  update() {}

  render() {}

  calculateBubbleMap() {
    let maxValue = 0;
    for (var i = 0; i < this.bubbleData.valueCount.length; i++) {
      maxValue += this.bubbleData.valueCount[i];
    }

    console.log(maxValue);
    for (var i = 0; i < this.bubbleData.value.length; i++) {
      let item = this.bubbleData.value[i];
      let x = p5.random(this.x, this.x + this.w);
      let y = p5.random(this.y, this.y + this.h);
      let b = new Bubble(x, y, p5.random(100), item);
    }
  }

  setvalue() {
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

    this.bubbleData = { value: value, valueCount: valueCount };
  }
}
