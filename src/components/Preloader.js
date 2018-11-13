import React, { Component } from "react";
import logo from "../images/logo-animation.gif";

class Preloader extends Component {
  render() {
    return (
      <div className="container preloader">
        <h4 className="preloader__header">
          Loading
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h4>
        <img src={logo} className="preloader__image" alt="spinning logo" />
      </div>
    );
  }
}

export default Preloader;
// TODO: Make preloader gif
