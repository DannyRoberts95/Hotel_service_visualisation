import React from "react";
import SketchHolder from "./components/SketchHolder.js";

import "../node_modules/uikit/dist/css/uikit.css";
import "../node_modules/uikit/dist/js/uikit.js";
import "./css/style.css";

function App() {
  return (
    <div className="uk-flex-middle uk-container-expand" uk-grid="true">
      <SketchHolder />
    </div>
  );
}

export default App;
