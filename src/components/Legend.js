import React, { Component } from "react";
import * as d3 from "d3";
import LegendBox from "./LegendBox";

class Legend extends Component {
  componentWillMount() {
    this.updateD3(this.props);
  }

  componentWillUpdate(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    this.width = d3.scaleBand().domain(this.props.colors.length);
    this.width.range([0, this.props.width]);
  }

  render() {
    // console.log(this.props.colors, this.props.width, "⛪");
    return (
      <g>
        {d3.range(20).map(i => (
          <LegendBox
            color={this.props.colors[i]}
            width={this.width.step()}
            x={this.width(i)}
            text={"test"}
            y="0"
          />
        ))}
      </g>
    );
  }
}

export default Legend;
