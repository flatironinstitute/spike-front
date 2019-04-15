import React, { Component } from "react";
import RecordingRow from "./RecordingRow";

class StudyRow extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  render() {
    const study = this.props.value;
    const open = this.state.open;
    let arrow = this.state.open ? "-" : "+";
    let rowClass = this.state.open ? "row__expanded-header" : "";
    const recordingsRows = this.props.value.recordings.map(recording => (
      <RecordingRow key={recording.name.toString()} value={recording} />
    ));
    const headRow = (
      <tr key={"recording-header"}>
        <th />
        <th>Recording Name</th>
        <th>Description</th>
        <th>Number of Channels</th>
        <th>Number of True Units</th>
        <th>Sample Rate in Hz</th>
        <th>Spike sign</th>
      </tr>
    );
    recordingsRows.unshift(headRow);
    return (
      <React.Fragment>
        <tr onClick={() => this.setState({ open: !open })} className={rowClass}>
          <td className="arrow__row">{arrow}</td>
          <td>{study.name}</td>
          <td>{study.recordings.length}</td>
          <td>{study.sorterNames ? study.sorterNames.join(", ") : ""}</td>
        </tr>
        {open ? recordingsRows : null}
      </React.Fragment>
    );
  }
}

export default StudyRow;

// Study Set Data:
// name, studies(count) arrow
// Study Data:
// name, sorterNames(array)
// Recording Data:
// description, durationSec, name, numChannels, numTrueUnits, sampleRateHz, spikeSign
// True Units:
// DO WE WANT THESE? RIGHT NOW ITS JUST THE IDS?
