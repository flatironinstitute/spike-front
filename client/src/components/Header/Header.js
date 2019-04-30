import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";

import { Nav, Navbar } from "react-bootstrap";
import logo from "./logo-no-icon.svg";
import InfoPanel from "./InfoPanel";

import { toTitleCase } from "../../utils";

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

  getPageName() {
    let activeRoute = this.props.router.location.pathname;
    let activeArr = activeRoute.split("/").filter(item => item);
    if (activeArr[0] === "study") {
      let str = activeArr[1].replace(/_/g, " ");
      return toTitleCase(str);
    } else if (activeArr.length) {
      return toTitleCase(activeArr.join(" "));
    } else {
      return "Overview";
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
    return (
      <div className="navbar__container">
        <InfoPanel width={this.state.width} height={this.state.height} />
        <Nav className="navbar__white">
          <LinkContainer exact to="/">
            <Navbar.Brand className="navbar__left">
              <img
                alt="spikeforest logo"
                src={logo}
                height="48"
                className="d-inline-block align-top"
              />
              <p className="navbar__pagename">{this.getPageName()}</p>
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="navbar__right">
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
          </Nav>
        </Nav>
      </div >
    );
  }
}

export default Header;
