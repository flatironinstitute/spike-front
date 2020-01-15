import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class StatsAlert extends Component {
  render() {
    /* CPU - sum of all cpuTimeSec on every sorting result */
    /* Ground truth - count of all true units */
    /* Recording data - hard code*/
    let general = this.props.general || {};
    let totalCpu = 0;
    if (this.props.sortingResults) {
      for (let sortingResult of this.props.sortingResults) {
        totalCpu += sortingResult.cpuTimeSec;
      }
    }
    let totalNumTrueUnits = 0;
    if (this.props.studySets) {
      for (let studySet of this.props.studySets) {
        for (let study of studySet.studies) {
          for (let recording of study.recordings) {
            totalNumTrueUnits += recording.numTrueUnits;
          }
        }
      }
    }
    let coreHours = Math.round(totalCpu / 60 / 60);
    let groundTruth = totalNumTrueUnits;
    return (
      <div className="alert__wrapper">
        <Alert dismissible variant={"secondary"} className="alert__stats">
          <div className="alert__ticker--wrapper">
            <div className="alert__ticker">
              <div className="ticker__item">
                <b>Project totals:</b> 1.3 TB of recordings;{" "}
                {groundTruth.toLocaleString()} ground truth units;{" "}
                {coreHours.toLocaleString()} compute hours
              </div>
              <div className="ticker__item">
                <b>Analysis updated:</b>{" "}
                {general.dateUpdated
                  ? new Date(general.dateUpdated).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric"
                    })
                  : ""}
              </div>
            </div>
          </div>
        </Alert>
      </div>
    );
  }
}

export default StatsAlert;
