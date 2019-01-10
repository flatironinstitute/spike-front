import React, { Component } from "react";
import HeatmapCount from "./HeatmapCount";
import HeatmapAverage from "./HeatmapAverage";
import "react-rangeslider/lib/index.css";
import {
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";

class HeatmapsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "count"
    };
  }

  handleFormatChange = value => {
    this.setState({
      format: value
    });
  };

  render() {
    let format = this.state.format;
    return (
      <div>
        <div className="container container__heatmap--row">
          <div className="heatmap_col col--12">
            <h4 className="slider__title">Spike Sorting Results Overview</h4>
            <ButtonToolbar>
              <ToggleButtonGroup
                type="radio"
                name="options"
                value={this.state.format}
                onChange={this.handleFormatChange}
              >
                <ToggleButton value={"count"}>
                  Number of Units Found
                </ToggleButton>
                <ToggleButton value={"average"}>
                  Average Accuracy Above a Threshhold
                </ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </div>
        </div>
        {format === "count" ? (
          <HeatmapCount {...this.props} format={this.state.format} />
        ) : (
          <HeatmapAverage {...this.props} format={this.state.format} />
        )}
      </div>
    );
  }
}

export default HeatmapsContainer;
