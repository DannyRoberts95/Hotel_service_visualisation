import React from "react";

class ReviewInfo extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {}

  render() {
    this.props.review
      ? console.log(this.props.review)
      : console.log("No review selected");
    return <div>Review info Window</div>;
  }
}
export default ReviewInfo;
