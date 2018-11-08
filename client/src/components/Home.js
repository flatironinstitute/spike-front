import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studySets: {},
      errors: []
    };
  }

  componentDidMount() {
    this.getSortingResults();
  }

  // TODO: Move this into a data handling JS file?
  // TODO: Make this iterative for every study in the studies?
  getSortingResults = () => {
    fetch("/api/getSortingResults")
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          studySets: json
        });
      })
      .catch(err => {
        this.setState({
          errors: [
            ...this.state.errors,
            "🤦‍ spikeforest_sorting_results failed to load"
          ]
        });
      });
  };

  render() {
    console.log("STUDY SETS", this.state.studySets);
    return (
      <div className="container container__body">
        <Header headerCopy={this.props.header} />
        {this.state.studySets.length < 1 ? <Preloader /> : null}
      </div>
    );
  }
}
export default Home;
