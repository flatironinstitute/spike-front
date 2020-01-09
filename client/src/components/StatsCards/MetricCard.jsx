import React, { Component } from "react";
import {
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  Form
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
      ? "card card__std-col"
      : "card card__std";
    return (
      <div className={primaryClass}>
        <div className="content">
          <div className="card__label">
            <div className="card__label--row">
              <p>
                Metric: <strong>{title}</strong>{" "}
                <span className="card__formula">{copy}</span>
              </p>
              <Form.Check type="checkbox" id="check-api-checkbox" inline>
                <Form.Check.Input
                  type="checkbox"
                  checked={this.props.imputeMissingValues}
                  onChange={evt => {
                    this.props.handleImputeMissingValuesChange(
                      evt.target.checked
                    );
                  }}
                />
                <Form.Check.Label className="input__label">
                  Impute missing values
                </Form.Check.Label>
              </Form.Check>
            </div>
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
          {/* <div title="If checked, calculations in the main table are based on imputed values using multiple linear regression to fill in missing data.">
            <input
              type="checkbox"
              checked={this.props.imputeMissingValues}
              onChange={evt => {
                this.props.handleImputeMissingValuesChange(evt.target.checked);
              }}
            />
            Impute missing values
          </div> */}
        </div>
      </div>
    );
  }
}

export default MetricCard;
