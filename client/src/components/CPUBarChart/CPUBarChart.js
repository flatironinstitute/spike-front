import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
  FlexibleWidthXYPlot,
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
    let legendItems = this.props.data.map(sorter => sorter._id);
    return (
      <div className="barchart">
        <FlexibleWidthXYPlot xType="ordinal" height={500} xPadding={30}>
          <DiscreteColorLegend
            height={100}
            position="top"
            orientation="horizontal"
            items={legendItems}
            className="barchart__legend"
          />
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis
            tickLabelAngle={-6}
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
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}
export default CPUBarChart;
