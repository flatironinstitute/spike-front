import React, { Component } from "react";
// import { NavLink } from "react-router-dom";

class LeftMenu extends Component {
  render() {
    return (
      <div className="container container__left-menu">
        <div className="left-menu">
          <a href="/about/background" className="left-menu__link">
            <span>Background</span>
          </a>
          <a href="/about/data" className="left-menu__link">
            <span>Platform Data</span>
          </a>
          <a href="/about/contributors" className="left-menu__link">
            <span>Contributors</span>
          </a>
          <a href="/about/contact" className="left-menu__link">
            <span>Contact</span>
          </a>
        </div>
      </div>
    );
  }
}
export default LeftMenu;
