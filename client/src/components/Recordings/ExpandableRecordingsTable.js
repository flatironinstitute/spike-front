import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StudySetRow from "./StudySetRow";

class ExpandableRecordingsTable extends Component {
  constructor() {
    super();

    this.state = {
      tableData: []
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
    return (
      <Table hover bordered className="recording__table">
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
        </tbody>
      </Table>
    );
  }
}

export default ExpandableRecordingsTable;
