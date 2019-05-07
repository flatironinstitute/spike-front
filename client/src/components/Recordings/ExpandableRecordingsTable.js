import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StudySetRow from "./StudySetRow";
import { isEmpty } from "../../utils";

import "./recordings.css";

class ExpandableRecordingsTable extends Component {
  constructor() {
    super();

    this.state = {
      tableData: []
    };
  }

  componentDidMount() {
    this.formatTableData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.studies !== prevProps.studies ||
      this.props.recordings !== prevProps.recordings
    ) {
      console.log(
        "🚀 componentDidUpdate changed props",
        !isEmpty(this.props.studies),
        "recordings:",
        !isEmpty(this.props.recordings)
      );
      this.formatTableData();
    }
  }

  formatTableData() {
    let formattedData = this.addRecordingsToStudies(this.props.recordings);
    let grouped = this.groupByStudySet(
      formattedData,
      formatted => formatted.studySetName
    );
    this.setState({ tableData: grouped });
  }

  addRecordingsToStudies(recordings) {
    // Iterate and match with study details
    let studiesWith = [];
    recordings.forEach(recording => {
      let [studyMatch] = this.props.studies.filter(
        study => study.name === recording._id
      );
      studiesWith.push({ ...studyMatch, recordings: recording.recordings });
    });
    return studiesWith;
  }

  groupByStudySet(list, keyGetter) {
    let map = this.props.studysets;
    list.forEach(item => {
      let key = keyGetter(item);
      let [studySet] = map.filter(set => set.name === key);
      if (!studySet.studies) {
        studySet.studies = [item];
      } else {
        studySet.studies.push(item);
      }
    });
    return map;
  }

  render() {
    let loading = isEmpty(this.state.tableData) || isEmpty(this.props.studies);
    let studysetrows = this.state.tableData.map(studySet => (
      <StudySetRow key={studySet._id.toString()} value={studySet} />
    ));
    let placeholder = (
      <tr>
        <td />
        <td>
          <em>Loading...</em>
        </td>
      </tr>
    );
    return (
      <div>
        <Table
          hover
          bordered
          responsive
          className="recording__table-expandable"
        >
          <thead>
            <tr>
              <th className="arrow__heading">+/-</th>
              <th>Study Set</th>
            </tr>
          </thead>
          <tbody>{loading ? placeholder : studysetrows}</tbody>
        </Table>
      </div>
    );
  }
}

export default ExpandableRecordingsTable;
