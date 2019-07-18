import React from "react";
import DropDown from "./Dropdown.js";
import Subheading from "./Subheading.js";
import Subheading2 from "./Subheading2.js";
import Heading from "./Heading.js";

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props);

    return (
      <div className="uk-offcanvas-bar">
        <h2 className="uk-modal-title">Filter Data</h2>
        <form className="=uk-form-horizontal uk-form-small uk-margin-large ">
          <DropDown
            label="Sentiment"
            options={this.props.sentimentValues}
            name="sentimentPreference"
            handleChange={this.props.handleChange}
            selected={this.props.sentimentPreference}
          />

          <DropDown
            label="Category"
            options={this.props.categoryValues}
            name="categoryPreference"
            handleChange={this.props.handleChange}
            selected={this.props.categoryPreference}
          />

          <DropDown
            label="Room Type"
            options={this.props.roomTypeValues}
            name="roomTypePreference"
            handleChange={this.props.handleChange}
            selected={this.props.roomTypePreference}
          />

          <DropDown
            label="Trip Type"
            options={this.props.tripTypeValues}
            name="tripTypePreference"
            handleChange={this.props.handleChange}
            selected={this.props.tripTypePreference}
          />

          <DropDown
            label="Group Type"
            options={this.props.tripType1Values}
            name="tripType1Preference"
            handleChange={this.props.handleChange}
            selected={this.props.tripType1Preference}
          />

          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="form-s-date">
              <Subheading2 content="Earliest Date" />
            </label>
            <input
              className="uk-input uk-form-small"
              id="form-s-date"
              name="earliestDate"
              value={new Date(this.props.earliestDate)
                .toJSON()
                .substring(0, 10)}
              type="date"
              onChange={this.props.handleChange}
            />
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="form-s-date">
              <Subheading2 content="Latest Date" />
            </label>
            <input
              className="uk-input uk-form-small"
              id="form-s-date"
              name="latestDate"
              value={new Date(this.props.latestDate).toJSON().substring(0, 10)}
              type="date"
              onChange={this.props.handleChange}
            />
          </div>
        </form>
        <p className="uk-text-center">
          <button
            className="uk-offcanvas-close"
            type="button"
            uk-close="true"
          />
        </p>
      </div>
    );
  }
} //END OF CLASS

export default Filter;
