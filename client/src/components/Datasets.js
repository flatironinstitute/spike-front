import React, { Component } from "react";
import Header from "./Header";

class Datasets extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      datasets: [],
      studies: []
    };
  }

  // Fetch the datasets on first mount
  componentDidMount() {
    this.getStudiesProcessed();
  }

  // Retrieves the list of datasets from the Express app
  getStudiesProcessed = () => {
    fetch("/api/getStudiesProcessed")
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(json => {
        console.log(json);
        this.setState({ datasets: json.datasets, studies: json.studies });
      })
      .catch(err => {
        console.log("👎 ERROR", err);
      });
  };

  render() {
    return (
      <div className="container container--body">
        <Header headerCopy={this.props.header} />
        <div className="datasets--list">
          {this.state.studies.map((study, i) => (
            <p key={i}>{study.name}</p>
          ))}
        </div>
      </div>
    );
  }
}
export default Datasets;
