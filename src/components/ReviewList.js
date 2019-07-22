import React from "react";
import Subheading from "./Subheading.js";

class ReviewInfo extends React.Component {
  constructor(props) {
    super();
    this.state = { listEntries: 25 };
  }

  componentDidMount() {}

  render() {
    let rl = Array.from(this.props.reviewList);
    let list = rl.splice(0, this.state.listEntries);
    let reviewList = list.map((item, i) => {
      return i < this.state.listEntries ? (
        <li key={i}>
          <div className="uk-grid-collapse " uk-grid="true" />

          <div className="uk-width-expand ">
            <button
              class="uk-button uk-button-text"
              name={item.entryID}
              onClick={this.props.handleReviewClick}
            >
              Review Id: {item.entryID}
            </button>
          </div>
        </li>
      ) : null;
    });

    return (
      <div
        className="uk-width-1-2 uk-height-1-1 uk-panel"
        uk-overflow-auto="true"
      >
        <p>Displaying {this.state.listEntries} entries.</p>
        <ul className="uk-list uk-list-striped ">{reviewList}</ul>
        <button
          class="uk-button uk-button-text"
          onClick={prevState =>
            this.setState(function(prevState) {
              return {
                listEntries: prevState.listEntries + 50
              };
            })
          }
        >
          Load more
        </button>
      </div>
    );
  }
}
export default ReviewInfo;
