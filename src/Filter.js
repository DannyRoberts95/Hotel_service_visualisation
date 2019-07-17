import React from "react";
import DropDown from "./Dropdown.js";

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props);

    const sentimentValueOptions = this.props.sentimentValues.map((item, i) => {
      return (
        <label key={i}>
          <input
            className="uk-radio"
            type="radio"
            name="radio1"
            value={item}
            onChange={this.props.handleChange}
          />
          {item}
        </label>
      );
    });

    return (
      <div>
        <form className="=uk-form-horizontal uk-margin-large">
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
        </form>
      </div>
    );
  }
} //END OF CLASS

export default Filter;
