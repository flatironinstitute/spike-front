import React, { Component } from "react";
import * as d3 from "d3";

const Swatch = ({ color, width, x, y }) => (
  <rect width={width} height="20" x={x} y={y} style={{ fill: color }} />
);

class Heatmap extends Component {
  constructor(props) {
    super();
    this.updateD3(props);
    let colors = d3.schemePurples[10];
    this.state = {
      colors: colors
    };
  }

  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    this.setAxisArrays(props.results);
  }

  setAxisArrays(results) {
    let studies = results
      .map(item => item.study)
      .filter((value, index, self) => self.indexOf(value) === index);
    let sorters = results
      .map(item => item.sorter)
      .filter((value, index, self) => self.indexOf(value) === index);
    console.log(sorters, studies);
  }

  render() {
    return <g transform="translate(10, 30)" ref="g" />;
  }
}

export default Heatmap;
