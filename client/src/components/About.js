import React, { Component } from "react";
import LeftMenu from "./components/LeftMenu";
import Header from "./components/Header";

class About extends Component {
  render() {
    return (
      <div className="container container--body">
        <Header />
      </div>
    );
  }
}
export default About;
// TODO: Refactor out the headers to be reusable.
