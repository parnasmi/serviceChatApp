import React from "react";
import "./spinner.css";

const Spinner = () => (
  <div className="spinner-container">
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Spinner;
