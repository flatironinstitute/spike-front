import React, { Component } from "react";
import { Link } from "react-router-dom";

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
            defaultActiveKey="/"
            activeKey={activeRoute}
            onSelect={selectedKey => {
              console.log("🎹", selectedKey);
            }}
          >
            <Nav.Item>
              <Nav.Link eventKey="/">
                <Link to="/">Home</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/recordings">
                <Link to="/recordings">Recordings</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/sorters">
                <Link to="/sorters">Sorters</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/metrics">
                <Link to="/metrics">Metrics</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/internals">
                <Link to="/internals">Internals</Link>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav>
      </div>
    );
  }
}

export default Header;
