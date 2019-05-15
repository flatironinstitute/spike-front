import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./infopanel.css";

class InfoPanel extends Component {
  render() {
    let className = this.props.sidebar ? "info info__inset" : "info";
    return (
      <div className={className}>
        <h5>About SpikeForest</h5>
        <p>
          Not used for now.
        </p>
        <p className="info__byline">
          Project of{" "}
          <a
            href="https://flatironinstitute.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Center for Computational Mathematics,
          </a>{" "}
          <a
            href="https://flatironinstitute.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flatiron Institute.
          </a>
        </p>
      </div>
    );
  }
}
export default InfoPanel;
