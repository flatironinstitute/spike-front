import React, { Component } from "react";
import Header from "./Header";

class Home extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      datasets: [],
      studies: [],
      errors: []
    };
  }
  render() {
    return (
      <div className="container container--body">
        <Header headerCopy={this.props.header} />
      </div>
    );
  }
}
export default Home;
