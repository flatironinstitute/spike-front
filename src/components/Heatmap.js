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

  updateD3(props) {
    const scale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([0, 200]);
    const axis = d3.axisBottom(scale);
    d3.select(this.refs.g).call(axis);
  }

  render() {
    return <g transform="translate(10, 30)" ref="g" />;
  }
}

export default Heatmap;
