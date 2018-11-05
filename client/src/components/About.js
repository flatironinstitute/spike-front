import React, { Component } from "react";
// import LeftMenu from "./LeftMenu";
import Header from "./Header";

class About extends Component {
  render() {
    return (
      <div className="container container--body">
        <Header headerCopy={this.props.header} />
      </div>
    );
  }
}
export default About;
