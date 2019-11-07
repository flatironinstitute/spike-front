import React, { Component } from "react";
import logo from "./logo-animation.gif";
import "./preloader.css";
import { Container } from "react-bootstrap";

class Preloader extends Component {
  render() {
    let copy = this.props.message ? this.props.message : "Loading";
    return (
      <Container className="preloader">
        <h4 className="preloader__header">
          {copy}
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h4>
        <img src={logo} className="preloader__image" alt="spinning logo" />
      </Container>
    );
  }
}

export default Preloader;
