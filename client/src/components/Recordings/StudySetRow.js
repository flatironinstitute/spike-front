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
    const open = this.state.open;
    let arrow = this.state.open ? "🔽" : "▶️";
    const studiesRows = this.props.value.studies.map(study => (
      <StudyRow key={study._id.toString()} value={study} />
    ));
    const headRow = (
      <tr key={"study-header"}>
        <th />
        <th>Study Name</th>
        <th>Number of Recordings</th>
        <th />
        <th />
        <th />
        <th />
      </tr>
    );
    studiesRows.unshift(headRow);
    return (
      <React.Fragment>
        <tr onClick={() => this.setState({ open: !open })}>
          <td>
            {this.props.value.name} {arrow}
          </td>
          <td>{this.props.value.studies.length}</td>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        {open ? studiesRows : null}
      </React.Fragment>
    );
  }
}

export default StudySetRow;
