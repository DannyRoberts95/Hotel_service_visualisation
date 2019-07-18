import React from "react";

const Subheading = props => {
  return (
    <p className="uk-h6 uk-text-capitalize uk-margin-small-bottom">
      {props.content}
    </p>
  );
};

export default Subheading;
