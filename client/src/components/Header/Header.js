import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./logo-no-icon.svg";
// import InfoPanel from "./InfoPanel";
// TODO: Add info panel on left side

import "./Header.css";

class Header extends Component {
  render() {
    let activeRoute = this.props.router.location.pathname;
    // if (this.state.redirect) {
    //   return <Redirect push to={this.state.pushRoute} />;
    // }
    return (
      <div className="navbar__container">
        <Nav className="navbar__white">
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
