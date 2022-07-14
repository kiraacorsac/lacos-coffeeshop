import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { RestfulProvider } from "restful-react";

ReactDOM.render(
  <React.StrictMode>
    <RestfulProvider base="http://127.0.0.1:8000">
      <App />
    </RestfulProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

