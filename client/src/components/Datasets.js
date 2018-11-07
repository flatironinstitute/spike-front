import React, { Component } from "react";
import Header from "./Header";

class Datasets extends Component {
  render() {
    // TODO: remove console logs
    console.log("Studies", this.props.studies);
    console.log("Datasets", this.props.datasets);
    return (
      <div className="container container--body">
        <Header headerCopy={this.props.header} />
        <div className="datasets">
          <h3 className="datasets--title">Studies</h3>
          {this.props.studies.map((study, i) => (
            <p key={i}>{study.name}</p>
          ))}
        </div>
        <div className="datasets">
          <h3 className="datasets--title">Datasets</h3>
          {this.props.datasets.map((set, i) => (
            <p key={i}>{set.name}</p>
          ))}
        </div>
      </div>
    );
  }
}
export default Datasets;
