import React, { Component } from "react";
import Header from "./Header";
import StudiesList from "./StudiesList";

class Studies extends Component {
  render() {
    return (
      <div>
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
        </div>
        <StudiesList studies={this.props.studies} />
      </div>
    );
  }
}
export default Studies;
