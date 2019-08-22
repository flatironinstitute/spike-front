import React, { Component } from "react";
import {
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";

import { toTitleCase } from "../../utils";

export class MetricCard extends Component {
  getMetricCopy() {
    let copy;
    switch (this.props.metric) {
      case "accuracy":
        copy = " balances precision and recall.";
        break;
      case "precision":
        copy = "= 1 - (false positive rate)";
        break;
      case "recall":
        copy = "= 1 - (false negative rate)";
        break;
      default:
        copy = "";
    }
    return copy;
  }

  render() {
    let title = toTitleCase(this.props.metric);
    let copy = this.getMetricCopy();
    let primaryClass = this.props.bottomMargin
      ? "card card__stats-col"
      : "card card__stats";
    return (
      <div className={primaryClass}>
        <div className="content">
          <div className="card__label">
            <p>
              Metric: <strong>{title}</strong>{" "}
              <span className="card__formula">{copy}</span>
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
