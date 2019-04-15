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
    if (this.props.groupedRecordings) {
      this.formatFlatData(this.props.groupedRecordings);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.groupedRecordings !== this.props.groupedRecordings ||
      prevProps.studies !== this.props.studies
    ) {
      this.formatFlatData(this.props.groupedRecordings);
    }
  }

  async flattenAndFormat(recordings) {
    let mapped = Object.keys(recordings);
    let grArr = [];
    mapped.forEach((map, i) => {
      let obj = {};
      obj.id = i + "-" + map;
      obj.name = map;
      obj.studies = recordings[map];
      obj.studies.forEach(flatstudy => {
        let [studyMatch] = this.props.studies.filter(
          study => study.name === flatstudy._id
        );
        flatstudy.sorterNames = studyMatch.sorterNames;
        flatstudy.sorters = studyMatch.sorters;
        flatstudy.name = studyMatch.name;
        flatstudy._id = studyMatch._id;
      });
      grArr.push(obj);
    });
    return grArr;
  }

  async formatFlatData(recordings) {
    if (!isEmpty(this.props.studies)) {
      let flatData = await this.flattenAndFormat(recordings);
      this.setState({ tableData: flatData });
    }
  }

  render() {
    let loading = isEmpty(this.state.tableData) || isEmpty(this.props.studies);
    let studysetrows = this.state.tableData.map(studySet => (
      <StudySetRow key={studySet.id.toString()} value={studySet} />
    ));
    console.log(
      "🔺",
      loading,
      this.state.tableData,
      this.props.studies,
      this.props.groupedRecordings
    );
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
              <th>Study Sets</th>
              <th>Number of Studies</th>
            </tr>
          </thead>
          <tbody>{loading ? placeholder : studysetrows}</tbody>
        </Table>
      </div>
    );
  }
}

export default ExpandableRecordingsTable;
