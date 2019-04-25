import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
  Crosshair,
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
  constructor(props) {
    super(props);
    this.state = {
      legendItems: []
    };
    let colorArr = ["#70D6FF", "#FF70A6", "#FF9770", "#FFD670", "#E9FF70"];
  }

  componentDidMount() {
    let legendItems = this.props.data.map(sorter => sorter._id);
    this.setState({ legendItems: legendItems })
  }

  legendClickHandler = (item, i) => {
    console.log("legend click 🍔", item, i);
    // const { series } = this.state;
    // series[i].disabled = !series[i].disabled;
    // this.setState({ series });
  };

  render() {
    console.log(this.props.data, "🍔");
    return (
      <div className="cpu-barchart">
        {/* <DiscreteColorLegend
          width={180}
          items={this.state.legendItems}
          colors={this.colorArr}
          className="barchart__legend"
          onItemClick={this.legendClickHandler}
        /> */}
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
            />
          ))}
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}
export default CPUBarChart;
