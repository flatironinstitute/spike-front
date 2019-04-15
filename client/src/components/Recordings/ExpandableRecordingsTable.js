import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StudySetRow from "./StudySetRow";
import { isEmpty } from "../../utils";
import Preloader from "../Preloader/Preloader";

class ExpandableRecordingsTable extends Component {
  constructor() {
    super();

    this.state = {
      tableData: []
    };
  }

  componentDidMount() {
    if (this.props.groupedRecordings && !isEmpty(this.props.studies)) {
      this.formatFlatData(this.props.groupedRecordings);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.groupedRecordings !== this.props.groupedRecordings &&
      !isEmpty(this.props.studies)
    ) {
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
    this.setState({ tableData: grArr });
  }

  render() {
    let loading = isEmpty(this.state.tableData) && isEmpty(this.props.studies);
    let studysetrows = this.state.tableData.map(studySet => (
      <StudySetRow key={studySet.id.toString()} value={studySet} />
    ));
    let placeholder = (
      <tr>
        <td>
          <em>Loading...</em>
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
    );
    return (
      <div>
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
          <tbody>{loading ? placeholder : studysetrows}</tbody>
        </Table>
      </div>
    );
  }
}

export default ExpandableRecordingsTable;
