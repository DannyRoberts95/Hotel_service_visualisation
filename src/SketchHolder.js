import React from "react";
import Filter from "./Filter.js";

import * as d3 from "d3";

import data_import from "./data/test_data.csv";
// import data_import from "./data/hotel_data.csv";

import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch.js";

class SketchHolder extends React.Component {
  constructor(props) {
    super();
    this.state = {
      json_data: [],
      dataLoaded: false,
      sentimentPreference: "All",
      sentimentValues: [],
      categoryPreference: "All",
      categoryValues: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    d3.csv(data_import)
      .then(data => {
        const data_response = data.filter(i => i instanceof Object);

        //EXTRACT POSSIBLE SENTIMENTS FROM DATA
        let sentimentValues = data.map(i => {
          return i.Positive_Negative;
        });
        const dedupedSentimentValues = [
          ...new Set(["All"].concat(sentimentValues))
        ];
        //EXTRACT POSSIBLE CATEGORIES FROM DATA
        let categoryValues = data.map(i => {
          return i.Category;
        });
        const dedupedCategoryValues = [
          ...new Set(["All"].concat(categoryValues))
        ];

        this.setState({
          json_data: data_response,
          dataLoaded: true,
          sentimentValues: dedupedSentimentValues,
          categoryValues: dedupedCategoryValues
        });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    console.log(this.state);

    //FILTER DATA BY SENTIMENT
    const data = this.state.json_data;
    const data_filteredBySentiment = data.filter(
      i =>
        i.Positive_Negative === this.state.sentimentPreference ||
        this.state.sentimentPreference === "All"
    );
    //FILTER THE DATA BY CATEGORY
    const data_filteredByCategory = data_filteredBySentiment.filter(
      i =>
        i.Category === this.state.categoryPreference ||
        this.state.categoryPreference === "All"
    );

    //DATA TO BE PASSED TO THE P5 SKETCH
    const sketch_data = data_filteredByCategory;

    return (
      <div>
        <Filter
          handleChange={this.handleChange}
          sentimentPreference={this.state.sentimentPreference}
          sentimentValues={this.state.sentimentValues}
          categoryPreference={this.state.categoryPreference}
          categoryValues={this.state.categoryValues}
        />
        <P5Wrapper sketch={sketch} data={sketch_data} />
      </div>
    );
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target);
    console.log(value);
    console.log(name);
    this.setState({ [name]: value });
  }
}

export default SketchHolder;
