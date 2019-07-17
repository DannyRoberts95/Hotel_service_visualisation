import React from "react";
import Filter from "./Filter.js";

import * as d3 from "d3";

// import data_import from "./data/test_data.csv";
import data_import from "./data/hotel_data.csv";

import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch.js";

class SketchHolder extends React.Component {
  constructor(props) {
    super();
    this.state = { json_data: [], dataLoaded: false };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    d3.csv(data_import)
      .then(data => {
        const d = data.filter(i => i instanceof Object);
        this.setState({ json_data: d, dataLoaded: true });
      })
      .catch(err => {
        throw err;
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // console.log(target);
    // console.log(value);
    // console.log(name);
    this.setState({ [name]: value });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Filter handleChange={this.handleChange} />
        <P5Wrapper sketch={sketch} data={this.state.json_data} />
      </div>
    );
  }
}

export default SketchHolder;
