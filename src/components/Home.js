import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import HeatmapContainer from "./HeatmapContainer";
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

  componentDidMount() {
    if (this.props.units.length && this.props.studies.length) {
      let flatUnits = flattenUnits(this.props.units, this.props.studies);
      this.setState({ flatUnits: flatUnits });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.units !== prevProps.units) {
      let flatUnits = flattenUnits(this.props.units, this.props.studies);
      this.setState({ flatUnits: flatUnits });
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
    let sorters = this.props.sorters.length ? this.getSorters() : null;
    let studies = this.props.studies.length ? this.getStudies() : null;
    return (
      <div>
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          {loading ? (
            <Preloader />
          ) : (
            <div className="container__heatmap">
              <HeatmapContainer
                studies={studies}
                sorters={sorters}
                allUnits={this.state.flatUnits}
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
