import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
import Header from "./Header";

class About extends Component {
  render() {
    return (
      <div>
        <LeftMenu />
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
        </div>
      </div>
    );
  }
}
export default About;
