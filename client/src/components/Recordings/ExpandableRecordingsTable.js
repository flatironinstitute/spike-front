import React, { Component } from "react";
import { Collapse, Table } from "react-bootstrap";
import StudySetRow from "./StudySetRow";

class ExpandableRecordingsTable extends Component {
  constructor() {
    super();

    this.state = {
      tableData: [],
      open: false
    };
  }

  componentDidMount() {
    if (this.props.groupedRecordings) {
      this.formatFlatData(this.props.groupedRecordings);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.groupedRecordings !== this.props.groupedRecordings) {
      this.formatFlatData(this.props.groupedRecordings);
    }
  }

  formatFlatData(recordings) {
    let mapped = Object.keys(recordings);
    let grArr = [];
    mapped.forEach((map, i) => {
      let obj = {};
      obj.id = i + "-" + map;
      obj.name = map;
      obj.studies = recordings[map];
      grArr.push(obj);
    });
    this.setState({ tableData: grArr });
  }

  render() {
    console.log("🔺", this.state.tableData);
    const { open } = this.state;

    return (
      <Table striped bordered hover className="recording__table">
        <thead>
          <tr>
            <th>Study Sets</th>
            <th>Number of Studies</th>
            <th />
            <th />
            <th />
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {this.state.tableData.map(studySet => (
            <StudySetRow key={studySet.id.toString()} value={studySet} />
          ))}
          {/* <tr onClick={() => this.setState({ open: !open })}>
            <td>OBS Name</td>
            <td>OBS Description</td>
            <td>hpcloud</td>
            <td>nova</td>
            <td>created</td>
            <td />
            <td />
          </tr>
          <Collapse in={this.state.open}>
            <tr>
              <td>Hi from the hiddenRow</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          </Collapse> */}
        </tbody>
      </Table>
    );
  }
}

export default ExpandableRecordingsTable;

// Study Set Data:
// name, studies(count) arrow
// Study Data:
// name, sorterNames(array)
// Recording Data:
// description, durationSec, name, numChannels, numTrueUnits, sampleRateHz, spikeSign
// True Units:
// DO WE WANT THESE? RIGHT NOW ITS JUST THE IDS?
