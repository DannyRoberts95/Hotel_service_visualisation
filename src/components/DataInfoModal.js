import React from "react";
import ReviewInfo from "./ReviewInfo.js";
import ReviewList from "./ReviewList.js";
import Subheading from "./Subheading.js";
import Subheading2 from "./Subheading2.js";
import Heading from "./Heading.js";

export default class DataInfoModal extends React.Component {
  constructor(props) {
    super();
    this.state = { selectedReview: null };
    this.handleReviewClick = this.handleReviewClick.bind(this);
  }

  handleReviewClick(event) {
    const target = event.target;
    const reviewId = target.name;

    const r = this.props.reviewList.filter(item => item.entryID === reviewId);
    this.setState({ selectedReview: r[0] });
  }

  componentDidMount() {}
  render() {
    return (
      <div id="modal-info" uk-modal="true">
        <div class="uk-modal-dialog uk-modal-body uk-light uk-background-secondary rounded">
          <div class="uk-modal-header uk-background-secondary">
            <Heading content="Review Data" />
            <p className="uk-text-justify uk-margin-bottom-small">
              <b>{this.props.reviewList.length}</b> reviews match the current
              filter selection. Use the filter options to further narrow the
              filter selection and target specific subsets of the data.
            </p>
            <p className="uk-text-justify uk-margin-bottom-small">
              The reviews shown in the list below conform to selected filters.
              Select a review from the list below to view it's asscociated data.
            </p>
          </div>

          <div className="uk-modal-body uk-grid-medium " uk-grid="true">
            <ReviewInfo review={this.state.selectedReview} />
            <ReviewList
              reviewList={this.props.reviewList}
              handleReviewClick={this.handleReviewClick}
            />
          </div>
        </div>
      </div>
    );
  }
} //END OF CLASS
