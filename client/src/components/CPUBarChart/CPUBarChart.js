import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
  Crosshair,
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from "react-vis";

// Stylin'
import "./barchart.css";

class CPUBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: []
    };
  }

  componentDidMount() {
    let legendItems = this.props.data.map(sorter => sorter._id);
    this.setState({ legendItems: legendItems })
  }

  nearestXHandler = (value, { index }) => {
    this.setState({
      crosshairValues: [value]
    });
  };

  render() {
    return (
      <div className="cpu-barchart">
        <FlexibleWidthXYPlot xType="ordinal" height={500} xPadding={30}>
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
              colorType="literal"
              key={sorter + "-" + i}
              className="vertical-bar-series-example"
              data={sorter.studyGroup}
              onNearestX={this.nearestXHandler}
            />
          ))}
          <Crosshair
            values={this.state.crosshairValues}
          />
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}
export default CPUBarChart;
