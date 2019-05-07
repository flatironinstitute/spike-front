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
    const open = this.state.open;
    let arrow = this.state.open ? "-" : "+";
    let rowClass = this.state.open ? "row__expanded-header-studyset" : "";
    const studiesRows = this.props.value.studies.map(study => (
      <StudyRow key={study._id.toString()} value={study} />
    ));
    const headStudyRow = (
      <tr key={"study-header"}>
        <th />
        <th>Study Name</th>
        <th>Sorters Applied</th>
      </tr>
    );
    studiesRows.unshift(headStudyRow);
    return (
      <React.Fragment>
        <tr onClick={() => this.setState({ open: !open })} className={rowClass}>
          <td className="arrow__row">{arrow}</td>
          <td>{this.props.value.name}</td>
        </tr>
        {open ? studiesRows : null}
      </React.Fragment>
    );
  }
}

export default StudySetRow;
