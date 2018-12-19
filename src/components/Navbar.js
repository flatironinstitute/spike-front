import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.svg";
// import search from "../images/icon-search-wh.svg";

class Navbar extends Component {
  render() {
    return (
      <div className="nav__wrapper">
        <div className="container container__nav">
          <nav className="nav">
            <div className="nav__container">
              <NavLink to="/" className="nav__brand">
                <img src={logo} className="nav__logo" alt="logo" />
                <span className="nav__title">SpikeForest</span>
              </NavLink>
            </div>
          </nav>
          <div className="nav__right">
            <NavLink
              className="nav__link"
              to="/recordings"
              activeClassName="active"
            >
              Recordings
            </NavLink>
            <NavLink className="nav__link" to="/algos" activeClassName="active">
              Algorithms
            </NavLink>
            <NavLink className="nav__link" to="/about" activeClassName="active">
              About
            </NavLink>
            {/* <NavLink to="/">
              <img src={search} className="nav__search" alt="search" />
            </NavLink> */}
          </div>
        </div>
      </div>
    );
  }
}
export default Navbar;
// TODO: Make a search functionality
