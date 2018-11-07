import React, { Component } from "react";
import logo from "../logo.svg";

class Preloader extends Component {
  render() {
    return (
      <div className="container preloader">
        <h4 className="preloader--header">
          Loading
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h4>
        <img src={logo} className="preloader--image" alt="spinning logo" />
      </div>
    );
  }
}

export default Preloader;
// TODO: Make preloader gif
