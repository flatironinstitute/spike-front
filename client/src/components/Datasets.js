import React, { Component } from "react";
import Header from "./Header";

class Datasets extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      datasets: []
    };
  }

  // Fetch the datasets on first mount
  componentDidMount() {
    this.getDatasets();
  }

  // Retrieves the list of datasets from the Express app
  getDatasets = () => {
    fetch("/api/getDatasets")
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log("🖥️🕹️From the KB🖥️🕹️", json, typeof json);
        this.setState({ datasets: json });
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  };

  render() {
    let sets = this.state.datasets;
    return (
      <div className="container container--body">
        <Header headerCopy={this.props.header} />
        <div className="datasets--list">
          {sets.map((set, i) => (
            <p key={i}>{set}</p>
          ))}
        </div>
      </div>
    );
  }
}
export default Datasets;
