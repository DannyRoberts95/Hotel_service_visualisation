import React from "react";
import Filter from "./Filter.js";
import ReviewInfo from "./ReviewInfo.js";
// import ReviewInfo2 from "./ReviewInf2.js";

import * as d3 from "d3";

import data_import from "../data/test_data.csv";
// import data_import from "../data/hotel_data.csv";

import P5Wrapper from "react-p5-wrapper";

import Bubble_Map_Plot from "../p5_code/Bubble_Map_Plot.js";

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
      tripType1Values: [],
      earliestDate: null,
      latestDate: null,
      reviewerScores: [],
      reviewScoreMin: 0,
      reviewScoreMax: 10,
      selectedReview: {}
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

        //EXTRACT DATES FROM DATA
        const dates = data.map(item => {
          return new Date(item.Review_Date);
        });

        const earliestDate = dates.reduce((pre, cur) => {
          return Date.parse(pre) > Date.parse(cur) ? cur : pre;
        });
        const latestDate = dates.reduce((pre, cur) => {
          return Date.parse(pre) < Date.parse(cur) ? cur : pre;
        });

        const reviewerScores = data.map(item => item.Reviewer_Score);

        this.setState({
          json_data: data_response,
          dataLoaded: true,
          sentimentValues: dedupedSentimentValues,
          categoryValues: dedupedCategoryValues,
          roomTypeValues: dedupedRoomTypeValues,
          tripTypeValues: dedupedTripTypeValues,
          tripType1Values: dedupedTripType1Values,
          earliestDate: earliestDate,
          latestDate: latestDate,
          reviewerScores: reviewerScores
        });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    console.log(this.state);

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
        //FILTER DATA BY TRIP TYPE1
        item =>
          item.type1 === this.state.tripType1Preference ||
          this.state.tripType1Preference === "All"
      )
      .filter(
        //FILTER DATA BY DATE
        (item: any) =>
          new Date(item.Review_Date).getTime() >=
            new Date(this.state.earliestDate).getTime() &&
          new Date(item.Review_Date).getTime() <=
            new Date(this.state.latestDate).getTime()
      )
      .filter(
        //FILTER DATA BY SCORE
        item =>
          parseInt(item.Reviewer_Score) >= this.state.reviewScoreMin &&
          parseInt(item.Reviewer_Score) <= this.state.reviewScoreMax
      );

    return (
      <div>
        <button
          id="toggleFilter"
          className="uk-button uk-button-secondary uk-button-small uk-margin-medium-left uk-margin-medium-top"
          type="button"
          uk-toggle="target: #offcanvas-usage"
        >
          Options
        </button>
        <div
          id="offcanvas-usage"
          uk-offcanvas="mode: push"
          bg-close="true"
          esc-close="true"
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
            earliestDate={this.state.earliestDate}
            latestDate={this.state.latestDate}
            reviewScoreMin={this.state.reviewScoreMin}
            reviewScoreMax={this.state.reviewScoreMax}
          />
        </div>

        <P5Wrapper
          sketch={Bubble_Map_Plot}
          data={sketch_data}
          sentimentValues={this.state.sentimentValues}
          categoryValues={this.state.categoryValues}
          reviewerScores={this.state.reviewerScores}
          roomTypeValues={this.state.roomTypeValues}
          tripTypeValues={this.state.tripTypeValues}
          tripType1Values={this.state.tripType1Values}
        />

        <ReviewInfo review={this.state.selectedReview[0]} />
      </div>
    );
  }

  //METHOD TO BE PASSED P5 SKETCH ALLOWING SELECTED REVIEWS TO BE RECIEVED BY REACT
  // receiveId(id) {
  //   //FIND AND STORE THE SELECTED REVIEW
  //   const selectedReview = this.state.json_data.filter(
  //     item => item.entryID === selectedReviewId
  //   );
  //   this.setState({ selectedReview });
  // }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (value) {
      console.log(`${name} is now set to ${value}`);
      this.setState({ [name]: value });
    } else console.log(`Null value passed: ${value}`);
  }
}

export default SketchHolder;
