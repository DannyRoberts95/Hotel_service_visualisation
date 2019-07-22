import React from "react";

const Subheading = props => {
  return (
    <p className="uk-h3 uk-text-capitalize uk-margin-medium-bottom">
      {props.content}
    </p>
  );
};

export default Subheading;
