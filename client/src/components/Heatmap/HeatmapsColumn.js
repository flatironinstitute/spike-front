import React, { Component } from "react";
import HeatmapCount from "./HeatmapCount";
import HeatmapSNR from "./HeatmapSNR";
import HeatmapCPU from "./HeatmapCPU";
import HeatmapOptionsRow from "./HeatmapOptionsRow";

import "react-rangeslider/lib/index.css";
import "./heatmap.css";

class HeatmapsColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "count",
      metric: "accuracy",
      sliderValue: 0
    };
  }

  handleFormatChange = value => {
    this.setState({
      format: value,
      sliderValue: 0
    });
  };

  handleMetricChange = value => {
    this.setState({
      metric: value
    });
  };

  handleSliderChange = value => {
    let round = Math.round(value * 100) / 100;
    this.setState({
      sliderValue: round
    });
  };

  render() {
    return (
      <div>
        <HeatmapOptionsRow
          handleFormatChange={this.handleFormatChange}
          handleSliderChange={this.handleSliderChange}
          handleMetricChange={this.handleMetricChange}
          format={this.state.format}
          metric={this.state.metric}
          sliderValue={this.state.sliderValue}
        />
        {(() => {
          switch (this.state.format) {
            case "count":
              return (
                <HeatmapCount
                  {...this.props}
                  format={this.state.format}
                  metric={this.state.metric}
                  accuracy={this.state.sliderValue}
                />
              );
            case "average":
              return (
                <HeatmapSNR
                  {...this.props}
                  format={this.state.format}
                  metric={this.state.metric}
                  snrMin={this.state.sliderValue}
                />
              );
            case "cpu":
              return (
                <HeatmapCPU
                  {...this.props}
                  format={this.state.format}
                  cpuMax={this.state.sliderValue}
                />
              );
            default:
              return null;
          }
        })()}
      </div>
    );
  }
}

export default HeatmapsColumn;
