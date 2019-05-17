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
    const studiesRows = this.props.value.studies.map(study => (
      <StudyRow key={study._id.toString()} value={study} />
    ));
    const headStudyRow = (
      <tr key={"study-header"}>
        <th />
        <th />
        <th>Study Name</th>
        {/* <th>Sorters Applied</th> */}
      </tr>
    );
    studiesRows.unshift(headStudyRow);
    return (
      <React.Fragment>
        {/* <tr onClick={() => this.setState({ open: !open })} className={rowClass}> */}
        <tr className={rowClass}>
          <td onClick={() => this.setState({ open: !open })} className="arrow__row">{arrow}</td>
          <td>
            <Link to={`/studyset/${this.props.value.name}`}>{this.props.value.name}</Link> ({this.props.value.studies.length})
          </td>
        </tr>
        {open ? studiesRows : null}
      </React.Fragment>
    );
  }
}

export default StudySetRow;
