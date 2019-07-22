import React from "react";
import DropDown from "./Dropdown.js";
import Subheading from "./Subheading.js";
import Subheading2 from "./Subheading2.js";
import Heading from "./Heading.js";

class FilterModal extends React.Component {
  render() {
    return (
      <div id="modal-filter" uk-modal="true">
        <div
          class="uk-modal-dialog uk-modal-body uk-light uk-background-secondary uk-height-1-1 rounded"
          uk-overflow-auto="true"
        >
          <div class=" uk-background-secondary">
            <Heading content="Filter Reviews" />
            <p className="uk-text-justify">
              The options below may be used to apply filters to the data. These
              filters allow specific subsets of the data to be isolated and
              examined.
            </p>
          </div>
          <div className="uk-modal-body">
            <form
              className=" uk-form-horizontal uk-form-small uk-form-expand uk-grid-small"
              uk-grid="true"
            >
              <DropDown
                label="Sentiment"
                options={this.props.sentimentValues}
                name="sentimentPreference"
                handleChange={this.props.handleChange}
                selected={this.props.sentimentPreference}
                width="uk-width-1-1"
              />
              <div className=" uk-width-1-1">
                <label
                  className="uk-form-label uk-margin-right-small"
                  htmlFor="form-s-date"
                >
                  <Subheading2 content="Earliest Review Date:" />
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-small uk-form-width-expand "
                    id="form-s-date form-horizontal-input"
                    name="earliestDate"
                    value={new Date(this.props.earliestDate)
                      .toJSON()
                      .substring(0, 10)}
                    type="date"
                    onChange={this.props.handleChange}
                  />
                </div>
              </div>
              <div className=" uk-width-1-1">
                <label
                  className="uk-form-label uk-margin-right-small"
                  htmlFor="form-s-date"
                >
                  <Subheading2 content="Latest Review Date:" />
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-small uk-form-width-expand "
                    id="form-s-date form-horizontal-input"
                    name="latestDate"
                    value={new Date(this.props.latestDate)
                      .toJSON()
                      .substring(0, 10)}
                    type="date"
                    onChange={this.props.handleChange}
                  />
                </div>
              </div>
              <DropDown
                label="Minimum Review Score"
                options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                name="reviewScoreMin"
                handleChange={this.props.handleChange}
                selected={this.props.reviewScoreMin}
                width="uk-width-1-1"
              />
              <DropDown
                label="Maximum Review Score"
                options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                name="reviewScoreMax"
                handleChange={this.props.handleChange}
                selected={this.props.reviewScoreMax}
                width="uk-width-1-1"
              />

              <DropDown
                label="Review Category"
                options={this.props.categoryValues}
                name="categoryPreference"
                handleChange={this.props.handleChange}
                selected={this.props.categoryPreference}
                width="uk-width-1-1"
              />
              <DropDown
                label="Reviewer Room Type"
                options={this.props.roomTypeValues}
                name="roomTypePreference"
                handleChange={this.props.handleChange}
                selected={this.props.roomTypePreference}
                width="uk-width-1-1"
              />
              <DropDown
                label="Reviewer Trip Type"
                options={this.props.tripTypeValues}
                name="tripTypePreference"
                handleChange={this.props.handleChange}
                selected={this.props.tripTypePreference}
                width="uk-width-1-1"
              />
              <DropDown
                label="Reviewer Group Type"
                options={this.props.tripType1Values}
                name="tripType1Preference"
                handleChange={this.props.handleChange}
                selected={this.props.tripType1Preference}
                width="uk-width-1-1"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
} //END OF CLASS

export default FilterModal;
