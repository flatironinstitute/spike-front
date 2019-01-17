import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import HeatmapsContainer from "./HeatmapsContainer";
import { flattenUnits, mapUnitsBySorterStudy } from "../dataHandlers";
import { isEmpty } from "../utils";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatUnits: {},
      unitsMap: {}
    };
  }

  // TODO: Move flatten units and map units to redux?
  componentDidMount() {
    if (this.props.units && this.props.studies) {
      let flatUnits = flattenUnits(this.props.units, this.props.studies);
      this.setState({ flatUnits: flatUnits });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.units !== prevProps.units ||
      this.props.studies !== prevProps.studies
    ) {
      if (this.props.units && this.props.studies) {
        let flatUnits = flattenUnits(this.props.units, this.props.studies);
        this.setState({ flatUnits: flatUnits });
      }
    }
    if (this.state.flatUnits !== prevState.flatUnits) {
      this.mapUnits();
    }
  }

  async mapUnits() {
    let unitsMap = await mapUnitsBySorterStudy(
      this.state.flatUnits,
      this.props.sorters
    );
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
      isEmpty(this.state.flatUnits) ||
      isEmpty(this.props.studies) ||
      isEmpty(this.props.sorters);
    let sorters = this.props.sorters ? this.getSorters() : null;
    let studies = this.props.studies ? this.getStudies() : null;
    return (
      <div>
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          {loading ? (
            <Preloader />
          ) : (
            <div className="container__heatmap">
              <HeatmapsContainer
                {...this.props}
                shortStudies={studies}
                shortSorters={sorters}
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
