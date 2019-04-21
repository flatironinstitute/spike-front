import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  DiscreteColorLegend
} from "react-vis";

// Stylin'
import "./barchart.css";

class CPUBarChart extends Component {
  render() {
    let width =
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) *
        0.95 -
      60;
    let legendItems = this.props.sorters.map(sorter => sorter.name);
    return (
      <div className="barchart">
        <XYPlot xType="ordinal" width={width} height={500} xPadding={30}>
          <DiscreteColorLegend
            height={100}
            orientation="horizontal"
            items={legendItems}
            className="barchart__legend"
          />
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis
            tickLabelAngle={-15}
            style={{
              text: {
                stroke: "none",
                fill: "#222",
                fontWeight: 600,
                fontSize: "10px"
              }
            }}
          />
          <YAxis />
          {this.props.data.map((sorter, i) => (
            <VerticalBarSeries
              key={sorter + "-" + i}
              className="vertical-bar-series-example"
              data={sorter.studyGroup}
            />
          ))}
        </XYPlot>
      </div>
    );
  }
}
export default CPUBarChart;
