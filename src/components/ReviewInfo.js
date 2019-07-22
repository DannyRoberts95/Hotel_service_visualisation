import React from "react";
import Subheading from "./Subheading.js";
import Subheading2 from "./Subheading2.js";
import Heading from "./Heading.js";

class ReviewInfo extends React.Component {
  constructor(props) {
    super();
    this.state = { selectedReview: null };
  }

  componentDidMount() {
    this.props.review
      ? this.setState({ selectedReview: this.props.review })
      : console.log("No review selected");
  }

  render() {
    console.log(this.props);
    const review = this.props.review;

    return review ? (
      <div
        className="uk-width-1-2 uk-height-large uk-panel  rounded "
        uk-overflow-auto="true"
      >
        <div className="uk-padding-small">
          <Subheading content={`Review - ${review.entryID}`} />
          <Subheading2 content={`Review Data`} />

          <p className="">Posted:{review.Review_Date}</p>
          <p className="uk-text-small uk-text">
            <b>Comment:</b>
          </p>
          <p className="uk-text">{review.sentence}</p>

          <table className="uk-table uk-table-small">
            <tbody className="uk-text-small uk-text">
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
                  <b>Room Type:</b>
                </td>
                <td>{review.roomType}</td>
              </tr>
              <tr>
                <td className="uk-padding-remove-left">
                  <b> Group Type:</b>
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

          <Subheading2 content={`Reviewer Data`} />
          <table className="uk-table uk-table-small">
            <tbody className="uk-text-small uk-text">
              <tr>
                <td className="uk-padding-remove-left">
                  <b> Reviewer Id:</b>
                </td>
                <td>{review.userID}</td>
              </tr>

              <tr>
                <td className="uk-padding-remove-left">
                  <b> Reviewer Nationality:</b>
                </td>
                <td>{review.Reviewer_Nationality}</td>
              </tr>
              <tr>
                <td className="uk-padding-remove-left">
                  <b> Reviewer No. of Reviews:</b>
                </td>
                <td>{review.Total_Number_of_Reviews_Reviewer_Has_Given}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div className="uk-width-1-2 " />
    );
  }
}
export default ReviewInfo;
