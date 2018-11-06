import React, { Component } from "react";
import Header from "./Header";

class Datasets extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      datasets: [],
      studies: [],
      errors: []
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
        return res.json();
      })
      .then(json => {
        this.setState({
          datasets: json.datasets,
          studies: json.studies,
          errors: []
        });
      })
      .catch(err => {
        this.setState({
          errors: [
            ...this.state.errors,
            "🤦‍ spikeforest_studies_processed failed to load"
          ]
        });
      });
  };

  render() {
    return (
      <div className="container container--body">
        <Header headerCopy={this.props.header} />
        <div className="datasets--errors">
          {this.state.errors.length
            ? this.state.errors.map((err, i) => (
                <p className="datasets--error-message" key={i}>
                  {err}
                </p>
              ))
            : null}
        </div>
        <div className="datasets--list">
          <h3 className="datasets--title">Studies</h3>
          {this.state.studies.map((study, i) => (
            <p key={i}>{study.name}</p>
          ))}
        </div>
        <div className="datasets--list">
          <h3 className="datasets--title">Datasets</h3>
          {this.state.datasets.map((set, i) => (
            <p key={i}>{set.name}</p>
          ))}
        </div>
      </div>
    );
  }
}
export default Datasets;
