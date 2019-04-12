import React, { Component } from "react";
import { Collapse, Table } from "react-bootstrap";
import StudyRow from "./StudyRow";
import { isEmpty } from "../../utils";

class StudySetRow extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  render() {
    const studyset = this.props.value;
    const open = this.state.open;
    const listItems = studyset.studies.map(study => (
      // <StudyRow key={study._id} value={study} />
      <tr>
        <td>{study._id}</td>
        <td>{study.recordings.length}</td>
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
    ));
    return (
      <React.Fragment>
        <tr onClick={() => this.setState({ open: !open })}>
          <td>{studyset.name}</td>
          <td>{studyset.studies.length}</td>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        {/* <Collapse in={this.state.open}>{listItems}</Collapse> */}
      </React.Fragment>
    );
  }
}

export default StudySetRow;

// Study Set Data:
// name, studies(count) arrow
// Study Data:
// name, sorterNames(array)
// Recording Data:
// description, durationSec, name, numChannels, numTrueUnits, sampleRateHz, spikeSign
// True Units:
// DO WE WANT THESE? RIGHT NOW ITS JUST THE IDS?
