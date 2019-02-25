import React, { Component } from "react";
import { Form } from "react-bootstrap";

import "./statscards.css";

export class ModeCard extends Component {
  getFormatCopy() {
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
    return (
      <div className="card card--stats">
        <div className="content">
          <div className="card__label">
            <p>Mode</p>
            {this.getFormatCopy()}
          </div>
          <div className="card__footer">
            <hr />
            <div
              className="card__form"
              // value={this.props.format}
              // onChange={this.props.handleFormatChange}
            >
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select">
                  <option value={"count"}>
                    Number units found above metric threshold
                  </option>
                  <option value={"average"}>
                    Average metric above SNR threshold
                  </option>
                  <option value={"cpu"}>Estimated CPU Time</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModeCard;
