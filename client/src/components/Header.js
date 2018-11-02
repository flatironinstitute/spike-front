import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <h2 className="header__title">{this.props.name}</h2>
        <div className="header__copy">
          {this.props.paragraphs.map(para => (
            <p>{para}</p>
          ))}
        </div>
      </div>
    );
  }
}
export default Header;
