import React from "react";
import SketchHolder from "./components/SketchHolder.js";

import "../node_modules/uikit/dist/css/uikit.css";
import "../node_modules/uikit/dist/js/uikit.js";
import "uikit/dist/js/uikit-icons.min.js";

// import p5 from "p5";
// import p5Dom from "p5/lib/addons/p5.dom.js";

import "./css/style.css";

function App() {
  return (
    <div className="uk-flex-middle uk-container-expand" uk-grid="true">
      <SketchHolder />
    </div>
  );
}

export default App;
