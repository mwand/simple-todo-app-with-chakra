import React from "react";
import ReactDOM from "react-dom";

// filename needn't match component name.
import ToDoApp from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ToDoApp />
  </React.StrictMode>,
  rootElement
);