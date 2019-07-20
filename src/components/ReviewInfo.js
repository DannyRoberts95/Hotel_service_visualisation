import React from "react";
import Subheading from "./Subheading.js";

class ReviewInfo extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.review
      ? console.log(this.props.review)
      : console.log("No review selected");
  }

  render() {
    // console.log(this.props);

    const review = this.props.review;

    return review ? (
      <div
        className=""
        uk-scrollspy="cls: uk-animation-fade; target: div; delay: 200; repeat: true"
      >
        <div className=" uk-light uk-background-secondary uk-padding-small uk-position-small uk-position-bottom-right uk-card uk-card-small uk-width-1-3@s uk-width-1-4@m uk-width-1-6@l">
          <div className="uk-card-header">
            <div className="uk-grid-small uk-flex-middle" uk-grid="true">
              <div className="uk-width-expand ">
                <Subheading content="Review Data" />

                <p className="uk-text-meta uk-flex-middle">
                  Posted: {review.Review_Date}
                </p>
                <p className="uk-text-small uk-text-muted">
                  <b>Comment:</b>
                </p>
                <p className="uk-text">{review.sentence}</p>

                <table className="uk-table uk-table-small">
                  <tbody className="uk-text-small uk-text-muted">
                    <tr>
                      <td className="uk-padding-remove-left">
                        <b> Sentiment:</b>
                      </td>
                      <td>{review.Positive_Negative}</td>
                    </tr>

                    <tr>
                      <td className="uk-padding-remove-left">
                        {" "}
                        <b>Rating:</b>
                      </td>
                      <td>{review.Reviewer_Score}</td>
                    </tr>
                    <tr>
                      <td className="uk-padding-remove-left">
                        {" "}
                        <b>Category:</b>
                      </td>
                      <td>{review.Category}</td>
                    </tr>
                    <tr>
                      <td className="uk-padding-remove-left">
                        <b>Room:</b>
                      </td>
                      <td>{review.roomType}</td>
                    </tr>
                    <tr>
                      <td className="uk-padding-remove-left">
                        <b> Group:</b>
                      </td>
                      <td>{review.type1}</td>
                    </tr>
                    <tr>
                      <td className="uk-padding-remove-left">
                        {" "}
                        <b>Trip Type:</b>
                      </td>
                      <td>{review.type}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
export default ReviewInfo;
