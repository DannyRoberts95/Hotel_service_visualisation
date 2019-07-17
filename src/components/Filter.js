import React from "react";
import DropDown from "./Dropdown.js";
import Subheading from "./Subheading.js";
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
