import React from "react";
import Filter from "./Filter.js";

import * as d3 from "d3";

import data_import from "../data/test_data.csv";
// import data_import from "../data/hotel_data.csv";

import P5Wrapper from "react-p5-wrapper";
import sketch from "../p5_code/sketch.js";

class SketchHolder extends React.Component {
  constructor(props) {
    super();
    this.state = {
      json_data: [],
      dataLoaded: false,
      sentimentPreference: "All",
      sentimentValues: [],
      categoryPreference: "All",
      categoryValues: [],
      roomTypePreference: "All",
      roomTypeValues: [],
      tripTypePreference: "All",
      tripTypeValues: [],
      tripType1Preference: "All",
      tripType1Values: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    d3.csv(data_import)
      .then(data => {
        const data_response = data.filter(item => item instanceof Object);
        //ONCE THE DATA IS RECIEVED, EXTRACT
        //POSSIBLE CATEGORIES AND STORE THEM IN STATE

        //EXTRACT POSSIBLE SENTIMENTS FROM DATA
        let sentimentValues = data.map(item => {
          return item.Positive_Negative;
        });
        const dedupedSentimentValues = [
          ...new Set(["All"].concat(sentimentValues))
        ];

        //EXTRACT POSSIBLE CATEGORIES FROM DATA
        let categoryValues = data.map(item => {
          return item.Category;
        });
        const dedupedCategoryValues = [
          ...new Set(["All"].concat(categoryValues))
        ];

        //EXTRACT POSSIBLE ROOM TYPE FROM DATA
        let roomTypeValues = data.map(item => {
          return item.roomType;
        });
        const dedupedRoomTypeValues = [
          ...new Set(["All"].concat(roomTypeValues))
        ];

        //EXTRACT POSSIBLE ROOM TYPE FROM DATA
        let tripTypeValues = data.map(item => {
          return item.type;
        });
        const dedupedTripTypeValues = [
          ...new Set(["All"].concat(tripTypeValues))
        ];

        //EXTRACT POSSIBLE ROOM TYPE 1 FROM DATA
        let tripTypeValues1 = data.map(item => {
          return item.type1;
        });
        const dedupedTripType1Values = [
          ...new Set(["All"].concat(tripTypeValues1))
        ];

        this.setState({
          json_data: data_response,
          dataLoaded: true,
          sentimentValues: dedupedSentimentValues,
          categoryValues: dedupedCategoryValues,
          roomTypeValues: dedupedRoomTypeValues,
          tripTypeValues: dedupedTripTypeValues,
          tripType1Values: dedupedTripType1Values
        });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    // console.log(this.state);

    const sketch_data = this.state.json_data
      .filter(
        //FILTER DATA BY SENTIMENT
        item =>
          item.Positive_Negative === this.state.sentimentPreference ||
          this.state.sentimentPreference === "All"
      )
      .filter(
        //FILTER DATA BY CATEGORY
        item =>
          item.Category === this.state.categoryPreference ||
          this.state.categoryPreference === "All"
      )
      .filter(
        //FILTER DATA BY ROOM TYPE
        item =>
          item.roomType === this.state.roomTypePreference ||
          this.state.roomTypePreference === "All"
      )
      .filter(
        //FILTER DATA BY TRIP TYPE
        item =>
          item.type === this.state.tripTypePreference ||
          this.state.tripTypePreference === "All"
      )
      .filter(
        //FILTER DATA BY TRIP TYPE
        item =>
          item.type1 === this.state.tripType1Preference ||
          this.state.tripType1Preference === "All"
      );

    return (
      <div>
        <button
          id="toggleFilter"
          className="uk-button uk-button-secondary uk-button-large uk-margin-medium-left uk-margin-medium-top"
          type="button"
          uk-toggle="target: #offcanvas-usage"
        >
          Filter Options
        </button>

        <div
          id="offcanvas-usage"
          uk-offcanvas="true"
          bg-close="true"
          esc-close="true"
          className="uk-column-1-3"
        >
          <Filter
            handleChange={this.handleChange}
            sentimentPreference={this.state.sentimentPreference}
            sentimentValues={this.state.sentimentValues}
            categoryPreference={this.state.categoryPreference}
            categoryValues={this.state.categoryValues}
            roomTypePreference={this.state.roomTypePreference}
            roomTypeValues={this.state.roomTypeValues}
            tripTypePreference={this.state.tripTypePreference}
            tripTypeValues={this.state.tripTypeValues}
            tripType1Preference={this.state.tripType1Preference}
            tripType1Values={this.state.tripType1Values}
          />
        </div>

        <P5Wrapper sketch={sketch} data={sketch_data} />
      </div>
    );
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log(`${name} is now set to ${value}`);
    this.setState({ [name]: value });
  }
}

export default SketchHolder;
