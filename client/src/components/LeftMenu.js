import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class LeftMenu extends Component {
  render() {
    return (
      <div class="left-menu">
        <NavLink href="/about/background" className="left-menu__link">
          <span>Background and goals</span>
        </NavLink>
        <NavLink href="/about/data" className="left-menu__link">
          <span>Data and web interfaces</span>
        </NavLink>
        <NavLink href="/about/contributors" className="left-menu__link">
          <span>Contributors</span>
        </NavLink>
        <NavLink href="/about/contact" className="left-menu__link">
          <span>Contact</span>
        </NavLink>
      </div>
    );
  }
}
export default LeftMenu;
