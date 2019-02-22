import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./logo-no-icon.svg";
// import InfoPanel from "./InfoPanel";
// TODO: Add info panel on left side

import "./Header.css";

class Header extends Component {
  render() {
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
          <Nav className="navbar__right" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link eventKey="home" href="/">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="recordings" href="/recordings">
                Recordings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sorters" href="/sorters">
                Sorters
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="metrics" href="/metrics">
                Metrics
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="internals" href="/internals">
                Internals
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav>
      </div>
    );
  }
}
export default Header;
