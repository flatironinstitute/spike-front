import React, { Component } from "react";
import { Collapse, Table } from "react-bootstrap";

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
    return (
      <React.Fragment>
        <div>value.name</div>
        <tr onClick={() => this.setState({ open: !open })}>
          <td>{study._id}</td>
          <td>{study.recordings.length}</td>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        {/* <Collapse in={this.state.open}>
          {studyset.map(study => (
            <StudyRow key={study._id.toString()} value={study} />
          ))}
        </Collapse> */}
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
