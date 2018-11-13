import React, { Component } from "react";
import logo from "../images/logo.svg";

class Header extends Component {
  render() {
    return (
      <div className="header">
        {this.props.headerCopy.image ? (
          <img src={logo} className="header__logo" alt="logo" />
        ) : (
          <h2 className="header__title">{this.props.headerCopy.name}</h2>
        )}
        <div className="header__copy">
          {this.props.headerCopy.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    );
  }
}
export default Header;
