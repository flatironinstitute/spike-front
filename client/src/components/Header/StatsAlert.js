import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { isEmpty } from "../../utils";

class StatsAlert extends Component {
  constructor(props) {
    super(props);
    this.state = { totalCpu: 0 };
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.sortingResults !== prevProps.sortingResults &&
      !isEmpty(this.props.sortingResults)
    ) {
      this.setTotalCpu(this.props.sortingResults);
    }
  }

  setTotalCpu(sortingResults) {
    let totalCpu = 0;
    for (let sortingResult of sortingResults) {
      totalCpu += sortingResult.cpuTimeSec;
    }
    this.setState({ totalCpu: totalCpu });
  }

  render() {
    /* CPU - sum of all cpuTimeSec on every sorting result */
    /* Ground truth - count of all true units */
    /* Recording data - hard code*/
    let general = this.props.general || {};
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
    let coreHours = Math.round(this.state.totalCpu / 60 / 60);
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
                      minute: "numeric",
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
