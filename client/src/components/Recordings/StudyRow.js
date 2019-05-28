import React, { Component } from "react";
import RecordingRow from "./RecordingRow";
import { Link } from "react-router-dom";

class StudyRow extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  render() {
    const study = this.props.study;
    const open = this.state.open;
    let arrow = this.state.open ? "-" : "+";
    let rowClass = this.state.open ? "row__expanded-header-study" : "";
    const recordingsRows = study.recordings.map(recording => (
      <RecordingRow key={recording.name.toString()} recording={recording} />
    ));
    const headRow = (
      <tr key={"recording-header"}>
        <th />
        <th></th>
        <th></th>
        <th>Recording name</th>
        <th>Description</th>
        <th>Number of channels</th>
        <th>Number of ground truth units</th>
        <th>Sample rate in Hz</th>
        <th>Spike sign</th>
      </tr>
    );
    recordingsRows.unshift(headRow);
    return (
      <React.Fragment>
        <tr className={rowClass}>
          <td />
          <td onClick={() => this.setState({ open: !open })} className="arrow__row">{arrow}</td>
          <td>
            <Link to={`/study/${study.name}`}>{study.name}</Link> ({study.recordings.length})
          </td>
        </tr>
        {open ? recordingsRows : null}
      </React.Fragment>
    );
  }
}

export default StudyRow;
