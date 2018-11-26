import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import Error from "./Error";
import HeatmapContainer from "./HeatmapContainer";
import { organizeUnits } from "../dataHandlers";
import { isEmpty } from "../utils";

// TODO: Remove when JSON is done being used
// import ReactJson from "react-json-view";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedUnits: {},
      accuracy: 0.8,
      errors: []
    };
  }

  componentDidMount() {
    if (this.props.units.length) {
      this.sortUnits(this.props.units);
    }
  }

  async sortUnits(trueUnits) {
    console.log("🦄", trueUnits[0]);
    let orgs = organizeUnits(trueUnits);
    console.log("🐴", orgs);
  }

  // TODO: Separate filter accuracy in the lifecycle to allow for re-render
  filterAccuracy(sortedUnits) {
    let filtered = sortedUnits.map(result => {
      let above = result.accuracies.filter(accu => accu >= this.state.accuracy);
      result.in_range = above.length;
      return result;
    });
    this.setState({
      sortedUnits: filtered
    });
  }

  getStudies() {
    return this.props.studies
      .map(item => item.name)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  getSorters() {
    return this.props.sorters
      .map(item => item.name)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  render() {
    let loading =
      isEmpty(this.state.sortedUnits) ||
      isEmpty(this.props.sorters) ||
      isEmpty(this.props.studies);
    // console.log("🗃️", this.state.sortedUnits);
    return (
      <div>
        {this.state.errors.length ? <Error errors={this.state.errors} /> : null}
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          {loading ? (
            <Preloader />
          ) : (
            <div className="container container__heatmap">
              <HeatmapContainer
                results={this.state.sortedUnits}
                studies={this.getStudies()}
                sorters={this.getSorters()}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Home;
