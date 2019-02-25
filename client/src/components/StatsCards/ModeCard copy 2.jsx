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
            <Form className="card__form">
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select">
                  <option>Number units found above metric threshold</option>
                  <option>Average metric above SNR threshold</option>
                  <option>Estimated CPU Time</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default ModeCard;
