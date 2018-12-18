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

  // TODO: Move flatten units and map units to redux?
  componentDidMount() {
    if (this.props.units) {
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
    let loading =
      isEmpty(this.state.flatUnits) ||
      isEmpty(this.props.studies) ||
      isEmpty(this.props.sorters);

    if (!loading) {
      this.setState({ isLoading: false });
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
    console.log("🏠 👛", this.props, "🐍", this.state);
    let sorters = this.props.sorters ? this.getSorters() : null;
    let studies = this.props.studies ? this.getStudies() : null;
    return (
      <div>
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          {this.state.loading ? (
            /* <Preloader /> */
            <p>Home</p>
          ) : (
            <div className="container__heatmap">
              <HeatmapContainer
                studies={studies}
                sorters={sorters}
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
