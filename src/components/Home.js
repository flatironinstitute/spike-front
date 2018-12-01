import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import HeatmapContainer from "./HeatmapContainer";
import {
  flattenUnits,
  groupUnitsWithAccuracy,
  mapUnitsBySorterStudy
} from "../dataHandlers";
import { isEmpty } from "../utils";

// TODO: Remove when JSON is done being used
// import ReactJson from "react-json-view";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatUnits: {},
      accuracyArrayUnits: {},
      unitsMap: {}
    };
  }

  async componentDidMount() {
    if (this.props.units.length && this.props.sorters.length) {
      let flatUnits = await flattenUnits(
        this.props.units,
        this.props.sorters,
        this.props.studies
      );
      this.setState({ flatUnits: flatUnits });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.flatUnits !== prevState.flatUnits) {
      this.mapUnits();
      this.groupWithAccuracy();
    }
  }

  async groupWithAccuracy() {
    let accuracyArrayUnits = await groupUnitsWithAccuracy(this.state.flatUnits);
    this.setState({ accuracyArrayUnits: accuracyArrayUnits });
  }

  async mapUnits() {
    let unitsMap = await mapUnitsBySorterStudy(this.state.flatUnits);
    this.setState({ unitsMap: unitsMap });
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
      isEmpty(this.state.accuracyArrayUnits) || isEmpty(this.props.studies);
    return (
      <div>
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          {loading ? (
            <Preloader />
          ) : (
            <div className="container__heatmap">
              <HeatmapContainer
                studies={this.getStudies()}
                sorters={this.getSorters()}
                allUnits={this.state.flatUnits}
                results={this.state.accuracyArrayUnits}
                unitsMap={this.state.unitsMap}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Home;
