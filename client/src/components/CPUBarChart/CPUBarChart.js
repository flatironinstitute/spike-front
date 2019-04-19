import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries
} from "react-vis";

import {
  ButtonToolbar,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";

class CPUBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorter: "all"
    };
  }
  handleSorterChange = value => {
    this.setState({
      sorter: value
    });
  };

  render() {
    return (
      <div className="card__body">
        <ButtonToolbar>
          <ToggleButtonGroup
            type="radio"
            name="options"
            size="lg"
            value={this.state.sorter}
            onChange={this.handleSorterChange}
            className="metric_button_toggle"
          >
            <ToggleButton size="lg" value={"all"} variant="outline-dark">
              All
            </ToggleButton>
            {this.props.sorters.map((sorter, i) => (
              <ToggleButton
                key={sorter._id}
                size="lg"
                value={sorter.name}
                variant="outline-dark"
              >
                {sorter.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}
export default CPUBarChart;
