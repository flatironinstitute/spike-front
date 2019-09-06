import React, { Component } from "react";
import { Form } from "react-bootstrap";

export class ModeCard extends Component {
  getFormatCopy() {
    let copy;
    switch (this.props.format) {
      case "count":
        copy = "Number of units found above metric threshold";
        break;
      case "average":
        copy = "Average metric above SNR threshold";
        break;
      case "cpu":
        copy = "Estimated avg. compute time";
        break;
      default:
        copy = "";
    }
    return copy;
  }
  render() {
    let primaryClass = this.props.bottomMargin
      ? "card card__std-col card__std-top"
      : "card card__std";
    return (
      <div className={primaryClass}>
        <div className="content">
          <div className="card__label">
            <p>
              Mode: <strong>{this.getFormatCopy()}</strong>
            </p>
          </div>
          <div className="card__footer">
            <hr />
            <div className="card__form">
              <Form.Control
                as="select"
                size="lg"
                value={this.props.format}
                onChange={e => this.props.handleFormatChange(e.target.value)}
              >
                <option key={"average-1"} value={"average"}>
                  Average metric above SNR threshold
                </option>
                <option key={"count-1"} value={"count"}>
                  Number of units found above metric threshold
                </option>
                {this.props.showCPU ? (
                  <option key={"cpu-1"} value={"cpu"}>
                    Estimated average compute time
                  </option>
                ) : null}
              </Form.Control>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModeCard;
