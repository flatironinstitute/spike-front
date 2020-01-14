import React, { Component } from "react";
import logo from "./logo-animation.gif";
import "./preloader.css";
import { Container } from "react-bootstrap";

class Preloader extends Component {
  render() {
    let copy = "Loading";
    let subcopy = (
      <span>
        {" "}
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    );
    if (this.props.message) {
      copy = this.props.message;
    } else if (this.props.fetchFailure) {
      copy = "Unable to fetch data. Please refresh the page and try again.";
      subcopy = (
        <div>
          <br />
          If you see this message repeatedly, please check your internet
          connection as you may have insufficient bandwidth to load this site.
        </div>
      );
    }
    console.log("PRELOADER", this.props);
    return (
      <Container className="preloader">
        <h4 className="preloader__header">
          {copy}
          {subcopy}
        </h4>
        <img src={logo} className="preloader__image" alt="spinning logo" />
      </Container>
    );
  }
}

export default Preloader;
