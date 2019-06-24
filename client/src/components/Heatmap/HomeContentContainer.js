
import React, { Component } from "react";
import HeatmapCount from "./HeatmapCount";
// import HeatmapSNR from "./HeatmapSNR";
// import HeatmapCPU from "./HeatmapCPU";
// import HeatmapCPU2 from "./HeatmapCPU2";
import HeatmapOptionsRow from "./HeatmapOptionsRow";

import "react-rangeslider/lib/index.css";
import "./heatmap.css";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

class HomeContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // metric: "accuracy"
    };
  }
  handleFormatChange = format => {
    this.props.setFormat(format);
    // var sliderValue;
    // switch (value) {
    //   case "cpu":
    //     sliderValue = 300;
    //     break;
    //   case "count":
    //     sliderValue = DEFAULT_SLIDER_COUNT;
    //     break;
    //   case "average":
    //     sliderValue = DEFAULT_SLIDER_AVERAGE;
    //     break;
    //   default:
    //     sliderValue = 0;
    // }
    // this.setState({
    //   format: value,
    //   sliderValue: sliderValue
    // });
  };

  handleMetricChange = metric => {
    this.props.setMetric(metric);
    // this.setState({
    //   metric: value
    // });
  };

  handleSliderChange = value => {
    let round = Math.round(value * 100) / 100;
    this.props.setSliderValue(this.props.format, round);
    // this.setState({
    //   sliderValue: round
    // });
  };

  render() {
    return (
      <div>
        <HeatmapOptionsRow
          handleFormatChange={this.handleFormatChange}
          handleSliderChange={this.handleSliderChange}
          handleMetricChange={this.handleMetricChange}
          format={this.props.format}
          metric={this.props.metric}
          sliderValue={this.props.sliderValue[this.props.format]}
          showCPU={true}
        />
        {(() => {
          switch (this.props.format) {
            case "count":
              return (
                <HeatmapCount
                  {...this.props}
                  format={this.props.format}
                  metric={this.props.metric}
                  sliderValue={this.props.sliderValue[this.props.format]}
                />
              );
            case "average":
              return (
                <HeatmapCount
                  {...this.props}
                  format={this.props.format}
                  metric={this.props.metric}
                  sliderValue={this.props.sliderValue[this.props.format]}
                />
              );
            case "cpu":
              return (
                <HeatmapCount
                  {...this.props}
                  format={this.props.format}
                  metric={this.props.metric}
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


function mapStateToProps(state) {
  return {
    format: state.format,
    sliderValue: state.sliderValue,
    metric: state.metric
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContentContainer);

