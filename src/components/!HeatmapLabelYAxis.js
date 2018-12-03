import React, { Component } from "react";

class HeatmapLabelYAxis extends Component {
  render() {
    return (
      <g className="heatmap__label">
        <text
          id={this.props.label}
          style={{
            transform: `translate(${this.props.translateX}px, ${
              this.props.translateY
            }px)`
          }}
          textAnchor="start"
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
