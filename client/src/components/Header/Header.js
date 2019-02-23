import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./logo-no-icon.svg";
import InfoPanel from "./InfoPanel";

import "./Header.css";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      width: 1500,
      height: 341
    };
  }

  updateDimensions() {
    if (window.innerWidth < 500) {
      this.setState({ width: 450, height: 102 });
    } else {
      let update_width = window.innerWidth - 100;
      let update_height = Math.round(update_width / 4.4);
      this.setState({ width: update_width, height: update_height });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    let activeRoute = this.props.router.location.pathname;
    return (
      <div className="navbar__container">
        <Nav className="navbar__white">
          <div className="navbar__left">
            <InfoPanel width={this.state.width} height={this.state.height} />
          </div>
          <Navbar.Brand className="navbar__center" href="/">
            <img
              alt="spikeforest logo"
              src={logo}
              height="48"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav
            className="navbar__right"
            activeKey={activeRoute}
            onSelect={selectedKey => {
              console.log("Route to 🗺️", selectedKey);
            }}
          >
            <LinkContainer exact to="/">
              <Nav.Link eventKey="/">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/recordings">
              <Nav.Link eventKey="/recordings">Recordings</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/sorters">
              <Nav.Link eventKey="/sorters">Sorters</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/metrics">
              <Nav.Link eventKey="/metrics">Metrics</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/internals">
              <Nav.Link eventKey="/internals">Internals</Nav.Link>
            </LinkContainer>
          </Nav>
        </Nav>
      </div>
    );
  }
}

export default Header;
