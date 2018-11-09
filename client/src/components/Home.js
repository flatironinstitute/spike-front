import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import Error from "./Error";
// TODO: Remove when JSON is done being used
import ReactJson from "react-json-view";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      errors: []
    };
  }

  componentDidMount() {
    this.getBatchResults();
  }

  // TODO: Move this into a data handling JS file?
  getBatchResults = () => {
    fetch("/api/getBatchResults")
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.length > 1) {
          this.setState({
            results: json
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errors: [...this.state.errors, "🤦‍ spikeforest_batch failed to load"]
        });
      });
  };

  render() {
    console.log(this.state.results.length, "🦒 Length!");
    return (
      <div>
        {this.state.errors.length ? <Error errors={this.state.errors} /> : null}
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          {this.state.results.length && this.state.results.length > 1 ? (
            <div className="container">
              <ReactJson src={this.state.results} />
            </div>
          ) : (
            <Preloader />
          )}
        </div>
      </div>
    );
  }
}
export default Home;
