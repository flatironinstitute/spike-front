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
        // let list = JSON.stringify(json);
        // // let arr = Array.from(list);
        // console.log(json, typeof json);
        this.setState({ datasets: json });
      });
  };

  render() {
    return (
      <div className="container container--body">
        <Header headerCopy={this.props.header} />
        <p>{this.state.datasets[0]}</p>
        <p />
      </div>
    );
  }
}
export default Datasets;
