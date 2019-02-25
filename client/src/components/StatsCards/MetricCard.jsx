import React, { Component } from "react";
import {
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";

import { toTitleCase } from "../../utils";

import "./statscards.css";

export class MetricCard extends Component {
  getMetricCopy() {
    let copy;
    switch (this.props.format) {
      case "count":
        copy = "Number units found above metric threshold";
        break;
      case "average":
        copy = "Average metric above SNR threshold";
        break;
      case "cpu":
        copy = "Estimated CPU Time";
        break;
      default:
        copy = "";
    }
    return copy;
  }
  render() {
    let title = toTitleCase(this.props.metric);
    return (
      <div className="card card--stats">
        <div className="content">
          <div className="card__label">
            <p>
              Metric: <strong>{title}</strong>
            </p>
          </div>
          <div className="card__footer">
            <hr />
            <ButtonToolbar>
              <ToggleButtonGroup
                type="radio"
                name="options"
                size="lg"
                value={this.props.metric}
                onChange={this.props.handleMetricChange}
                className="metric_button_toggle"
              >
                <ToggleButton
                  size="lg"
                  value={"accuracy"}
                  variant="outline-dark"
                >
                  Accuracy
                </ToggleButton>
                <ToggleButton
                  size="lg"
                  value={"precision"}
                  variant="outline-dark"
                >
                  Precision
                </ToggleButton>
                <ToggleButton size="lg" value={"recall"} variant="outline-dark">
                  Recall
                </ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </div>
        </div>
      </div>
    );
  }
}

export default MetricCard;
