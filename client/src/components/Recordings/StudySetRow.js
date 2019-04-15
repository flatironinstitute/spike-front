import React, { Component } from "react";
import StudyRow from "./StudyRow";

class StudySetRow extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  render() {
    console.log("🔺", this.props.value);
    const open = this.state.open;
    let arrow = this.state.open ? "🔽" : "▶️";
    const studiesRows = this.props.value.studies.map(study => (
      <StudyRow key={study._id.toString()} value={study} />
    ));
    const headStudyRow = (
      <tr key={"study-header"}>
        <th />
        <th>Study Name</th>
        <th>Number of Recordings</th>
        <th>Sorters Applied</th>
        <th />
        <th />
        <th />
      </tr>
    );
    studiesRows.unshift(headStudyRow);
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
