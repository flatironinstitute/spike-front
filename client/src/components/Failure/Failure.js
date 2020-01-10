import React, { Component } from "react";
import logo from "./logo-animation.gif";
import "./preloader.css";
import { Container } from "react-bootstrap";

class Failure extends Component {
  render() {
    return (
      <Container className="preloader">
        <h4 className="preloader__header">
          We have failed
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h4>
        <img src={logo} className="preloader__image" alt="spinning logo" />
      </Container>
    );
  }
}

export default Failure;
