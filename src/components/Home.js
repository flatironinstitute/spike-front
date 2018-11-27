import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import Error from "./Error";
import HeatmapContainer from "./HeatmapContainer";
import { flattenUnits, groupUnitsWithAccuracy } from "../dataHandlers";
import { isEmpty } from "../utils";

// TODO: Remove when JSON is done being used
// import ReactJson from "react-json-view";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUnits: {},
      unitsByStudyAndSorter: {},
      filteredUnits: [],
      accuracy: 0.8,
      errors: []
    };
  }

  componentDidMount() {
    if (this.props.units.length) {
      this.sortUnits(this.props.units, this.props.sorters);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.unitsByStudyAndSorter !== prevState.unitsByStudyAndSorter) {
      this.filterAccuracy();
    }
  }

  async sortUnits(trueUnits, sorters) {
    let flatUnits = await flattenUnits(trueUnits, sorters);
    let unitsByStudyAndSorter = await groupUnitsWithAccuracy(flatUnits);
    console.log("🍍", unitsByStudyAndSorter);
    this.setState({
      allUnits: flatUnits,
      unitsByStudyAndSorter: unitsByStudyAndSorter
    });
  }

  // TODO: Separate filter accuracy in the lifecycle to allow for re-render
  filterAccuracy() {
    let filtered = this.state.unitsByStudyAndSorter.map(result => {
      let above = result.accuracies.filter(accu => accu >= this.state.accuracy);
      result.in_range = above.length;
      return result;
    });
    this.setState({
      filteredUnits: filtered
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
      isEmpty(this.state.unitsByStudyAndSorter) ||
      isEmpty(this.props.sorters) ||
      isEmpty(this.props.studies);
    // console.log("🗃️", this.state.unitsByStudyAndSorter);
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
                results={this.state.unitsByStudyAndSorter}
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
