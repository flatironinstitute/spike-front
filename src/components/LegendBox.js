import React, { Component } from "react";

class LegendBox extends Component {
  render() {
    // console.log("🍀", this.props);
    return (
      <g>
        <rect
          width={this.props.width}
          height="20"
          x={this.props.x}
          y="0"
          style={{ fill: this.props.color }}
        />
        <text
          width={this.props.width}
          height="20"
          x={this.props.x}
          y="21"
          className="mono"
        >
          {this.props.text}
        </text>
      </g>
    );
  }
}

export default LegendBox;
