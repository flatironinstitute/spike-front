import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StudySetRow from "./StudySetRow";
import { isEmpty } from "../../utils";

import "./recordings.css";

class ExpandableRecordingsTable extends Component {
  constructor() {
    super();

    this.state = {
    };
  }

  componentDidMount() {
    //
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.studySets !== prevProps.studySets
    ) {
      //
    }
  }

  render() {
    let loading = isEmpty(this.props.studySets);
    let studysetrows = this.props.studySets.map(studySet => (
      <StudySetRow key={studySet.name} studySet={studySet} />
    ));
    let placeholder = (
      <tr>
        <td />
        <td>
          <em>Loading...</em>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
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
