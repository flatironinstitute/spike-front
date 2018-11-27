import React, { Component } from "react";

class HeatmapLabelXAxis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translateX: 0
    };
  }
  componentDidMount() {
    this.getTranslationX();
  }
  getTranslationX() {
    // TODO: make base responsive/inherited
    const base = 226;
    const cell = (this.props.x / 3) * -1;
    console.log(cell, "📴");
    this.setState({
      translateX: base + cell
    });
  }
  render() {
    return (
      <g className="heatmap__label">
        <text
          id={this.props.label}
          style={{
            transform: `translate(${this.state.translateX}px, ${
              this.props.translateY
            }px) rotate(-45deg)`
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

export default HeatmapLabelXAxis;
