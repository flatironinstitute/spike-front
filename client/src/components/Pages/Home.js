import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import HomeContentContainer from "../Heatmap/HomeContentContainer";
import { flattenUnitResults, formatUnitResults } from "../../dataHandlers";
import { isEmpty } from "../../utils";
import { Container, Card } from "react-bootstrap";
import StatsAlert from "../Header/StatsAlert";

import "./pages.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatUnits: {},
      unitsMap: {}
    };
  }

  componentDidMount() {
    if (this.props.groupedURs && this.props.studies) {
      let flatUnits = flattenUnitResults(
        this.props.groupedURs,
        this.props.studies
      );
      this.setState({ flatUnits: flatUnits });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.groupedURs !== prevProps.groupedURs ||
      this.props.studies !== prevProps.studies
    ) {
      if (this.props.groupedURs && this.props.studies) {
        let flatUnits = flattenUnitResults(
          this.props.groupedURs,
          this.props.studies
        );
        this.setState({ flatUnits: flatUnits });
      }
    }
    if (this.state.flatUnits !== prevState.flatUnits) {
      this.mapUnits();
    }
  }

  async mapUnits() {
    let unitsMap = await formatUnitResults(
      this.state.flatUnits,
      this.props.sorters
    );
    this.setState({ unitsMap: unitsMap });
  }

  getStudies() {
    // returns the unique names of the studies
    return this.props.studies
      .map(item => item.name)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  getSorters() {
    // returns the unique names of the sorters
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
      <div className="page__body page__body--alert ">
        <StatsAlert {...this.props} />
        {loading ? (
          <Container className="container__heatmap" id="overview">
            <Card>
              <Card.Body>
                <Preloader />
              </Card.Body>
            </Card>
          </Container>
        ) : (
          <HomeContentContainer
            id="overview"
            {...this.props}
            shortStudies={studies}
            shortSorters={sorters}
            // TODO: Swap units map for another value?
            unitsMap={this.state.unitsMap}
          />
        )}
      </div>
    );
  }
}
export default Home;