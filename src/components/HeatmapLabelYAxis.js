import React, { Component } from "react";
import * as d3 from "d3";

class HeatmapLabelYAxis extends Component {
  render() {
    let styles = `transform: translate(${this.props.translateX}px, ${
      this.props.translateY
    }px)`;
    return (
      <g className="heatmap__label">
        <text
          id={this.props.label}
          style={{
            transform: `translate(${this.props.translateX}px, ${
              this.props.translateY
            }px)`
          }}
          textAnchor="end"
          x={this.props.x}
          y={this.props.y}
          className={this.props.id}
        >
          {this.props.label}
        </text>
      </g>
    );
  }
}

export default HeatmapLabelYAxis;
