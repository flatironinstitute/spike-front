
import React, { Component } from "react";
import HeatmapCount from "./HeatmapCount";
// import HeatmapSNR from "./HeatmapSNR";
// import HeatmapCPU from "./HeatmapCPU";
// import HeatmapCPU2 from "./HeatmapCPU2";
import HeatmapOptionsRow from "./HeatmapOptionsRow";

import "react-rangeslider/lib/index.css";
import "./heatmap.css";

class HomeContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "count",
      metric: "accuracy",
      sliderValue: 0.8
    };
  }
  handleFormatChange = value => {
    var sliderValue;
    switch (value) {
      case "cpu":
        sliderValue = 300;
        break;
      case "count":
        sliderValue = 0.8;
        break;
      case "average":
        sliderValue = 5;
        break;
      default:
        sliderValue = 0;
    }
    this.setState({
      format: value,
      sliderValue: sliderValue
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
          showCPU={true}
        />
        {(() => {
          switch (this.state.format) {
            case "count":
              return (
                <HeatmapCount
                  {...this.props}
                  format={this.state.format}
                  metric={this.state.metric}
                  sliderValue={this.state.sliderValue}
                />
              );
            case "average":
              return (
                <HeatmapCount
                  {...this.props}
                  format={this.state.format}
                  metric={this.state.metric}
                  sliderValue={this.state.sliderValue}
                />
              );
            case "cpu":
              return (
                <HeatmapCount
                  {...this.props}
                  format={this.state.format}
                  metric={this.state.metric}
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

export default HomeContentContainer;
