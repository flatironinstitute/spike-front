import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import HeatmapsColumn from "../Heatmap/HeatmapsColumn";
import { flattenUnits, mapUnitsBySorterStudy } from "../../dataHandlers";
import { isEmpty } from "../../utils";
import { Container, Card } from "react-bootstrap";

import "./pages.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatUnits: {},
      unitsMap: {}
    };
  }

  // TODO: Move these unit pulls and calculations to a parent process?
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
      <div className="page__body">
        {loading ? (
          <Container className="container__heatmap" id="overview">
            <Card>
              <Card.Body>
                <Preloader />
              </Card.Body>
            </Card>
          </Container>
        ) : (
          <HeatmapsColumn
            id="overview"
            {...this.props}
            shortStudies={studies}
            shortSorters={sorters}
            unitsMap={this.state.unitsMap}
          />
        )}
      </div>
    );
  }
}
export default Home;
