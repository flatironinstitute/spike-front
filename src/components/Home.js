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
      errors: []
    };
  }

  componentDidMount() {
    if (this.props.units.length) {
      this.sortUnits(this.props.units, this.props.sorters);
    }
  }

  async sortUnits(trueUnits, sorters) {
    let flatUnits = await flattenUnits(trueUnits, sorters);
    let unitsByStudyAndSorter = await groupUnitsWithAccuracy(flatUnits);
    this.setState({
      allUnits: flatUnits,
      unitsByStudyAndSorter: unitsByStudyAndSorter
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
      isEmpty(this.state.unitsByStudyAndSorter) || isEmpty(this.props.studies);
    return (
      <div>
        {this.state.errors.length ? <Error errors={this.state.errors} /> : null}
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          {loading ? (
            <Preloader />
          ) : (
            <div className="container__heatmap">
              <HeatmapContainer
                studies={this.getStudies()}
                sorters={this.getSorters()}
                allUnits={this.state.allUnits}
                results={this.state.unitsByStudyAndSorter}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Home;
