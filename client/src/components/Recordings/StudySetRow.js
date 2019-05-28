import React, { Component } from "react";
import StudyRow from "./StudyRow";
import { Link } from "react-router-dom";

class StudySetRow extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  render() {
    const open = this.state.open;
    let arrow = this.state.open ? "-" : "+";
    let rowClass = this.state.open ? "row__expanded-header-studyset" : "";
    const studiesRows = this.props.studySet.studies.map(study => (
      <StudyRow key={study.name.toString()} study={study} />
    ));
    const headStudyRow = (
      <tr key={"study-header"}>
        <th />
        <th />
        <th>Study Name</th>
      </tr>
    );
    studiesRows.unshift(headStudyRow);
    return (
      <React.Fragment>
        <tr className={rowClass}>
          <td onClick={() => this.setState({ open: !open })} className="arrow__row">{arrow}</td>
          <td>
            <Link to={`/studyset/${this.props.studySet.name}`}>{this.props.studySet.name}</Link> ({this.props.studySet.studies.length})
          </td>
        </tr>
        {open ? studiesRows : null}
      </React.Fragment>
    );
  }
}

export default StudySetRow;
