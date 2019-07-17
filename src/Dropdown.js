import React, { Component } from "react";
class DropDown extends React.Component {
  render() {
    const options = this.props.options.map(item => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
    return (
      <div className="uk-margin">
        <label className="uk-form-label" forhtml="form-horizontal-select">
          {this.props.label}
        </label>
        <div className="uk-form-controls">
          <select
            id="form-horizontal-select"
            className="uk-select"
            value={this.props.selected}
            name={this.props.name}
            onChange={this.props.handleChange}
          >
            {options}
          </select>
        </div>
      </div>
    );
  }
}

export default DropDown;
