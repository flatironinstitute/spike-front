import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="nav__container">
          <Link to="/" className="nav__brand">
            <img src={logo} alt="logo" className="nav__logo" />
          </Link>
          <div className="nav__right">
            <ul className="nav__item-wrapper">
              <li className="nav__item">
                <Link className="nav__link" to="/datasets">
                  Datasets
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
