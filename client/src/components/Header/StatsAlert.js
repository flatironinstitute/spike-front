import React, { Component } from "react";
import { Alert } from "react-bootstrap";

import "./Header.css";

class StatsAlert extends Component {
  render() {
    /* CPU - sum of all cpuTimeSec on every sorting result */
    /* Ground truth - count of all true units */
    /* Recording data - hard code*/
    let coreHours = this.props.stats ? this.props.stats.cpus : "";
    let groundTruth = this.props.stats ? this.props.stats.groundTruth : "";
    return (
      <div>
        <Alert variant={"success"} className="alert__stats">
          <div className="alert__ticker--wrapper">
            <div className="alert__ticker">
              <div className="ticker__item">
                <b>Project Totals:</b>
              </div>
              <div className="ticker__item">
                {Math.round(coreHours / 60)} CPU core hours
              </div>
              <div className="ticker__item">
                {groundTruth.toLocaleString()} ground truth units
              </div>
              <div className="ticker__item">1.2TB of recordings</div>
            </div>
          </div>
        </Alert>
      </div>
    );
  }
}

export default StatsAlert;
