import React, { Component } from "react";
import * as d3 from "d3";

class Heatmap extends Component {
  constructor(props) {
    super();
    this.updateD3(props);
  }

  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {}

  makeBar(bar) {}

  render() {
    return <div />;
  }
}

export default Heatmap;
