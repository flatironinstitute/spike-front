import React, { Component } from "react";
import { Alert } from "react-bootstrap";

import "./Header.css";

class StatsAlert extends Component {
  render() {
    /* CPU - sum of all cpuTimeSec on every sorting result */
    /* Ground truth - count of all true units */
    /* Recording data - hard code*/

    let stats = this.props.stats ? this.props.stats : "";
    console.log("🖋️", stats);
    return (
      <div>
        <Alert variant={"success"} className="alert__stats">
          <div className="alert__ticker">
            <b>Project Totals:</b> 11111 CPU core hours, 2222222 ground truth
            units, 1.2TB of recordings
          </div>
        </Alert>
      </div>
    );
  }
}

export default StatsAlert;
