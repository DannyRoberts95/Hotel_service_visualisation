import React, { Component } from "react";
import Subheading2 from "./Subheading2.js";
class DropDown extends Component {
  render() {
    const options = this.props.options.map((item, i) => {
      return (
        <option key={i} value={item}>
          {item}
        </option>
      );
    });
    return (
      <div className={this.props.width + " uk-margin-top-small"}>
        <label className="uk-form-label" forhtml="form-horizontal-select">
          <Subheading2 content={`${this.props.label}:`} />
        </label>
        <div className="uk-form-controls">
          <select
            id="form-horizontal-select"
            className="uk-select uk-form-small uk-form-width-expand"
            value={this.props.selected}
            name={this.props.name}
            onChange={this.props.handleChange}
          >
            {options}
          </select>
        </div>
        <hr />
      </div>
    );
  }
}

export default DropDown;
