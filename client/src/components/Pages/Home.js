import React, { Component } from 'react';
import Preloader from '../Preloader/Preloader';
import HeatmapsColumn from '../Heatmap/HeatmapsColumn';
import { flattenUnits, mapUnitsBySorterStudy } from '../../dataHandlers';
import { isEmpty } from '../../utils';
import Container from 'react-bootstrap/Container';
import { HashLink as Link } from 'react-router-hash-link';

import './pages.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatUnits: {},
      unitsMap: {},
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
      <div className="home__body">
        <div className="intro">
          <p className="big big--home">Spike Sorting Results</p>
          <div className="dividerthick" />
          <p className="subhead">
            Spike sorting algorithms, compared against electrophysiology
            datasets with groundtruth
          </p>
          <p className="byline">
            Project of
            <a href="https://flatironinstitute.org">Flatiron Institute</a>
          </p>
          <p className="updated">Updated on February 14, 2019</p>
          <p className="updated-sub">
            Browse all datasets, algorithms, sorting results, and comparisons,
            and inspect the source code used to generate these data. Use the
            links to the right to learn about recordings, sorters, and metric
            definitions.
          </p>
          <p className="jump-container">
            <Link smooth to="/#overview" className="jump-link">
              Jump to Results Overview
            </Link>
          </p>
        </div>
        <div className="opener">
          <div className="prose-container prose-container--wide">
            <p>
              Electrical recording from extracellular probes is a popular and
              affordable method to capture the simultaneous activity of many
              neurons in the brain or retina. There is a great need to quantify
              the reliability of the firing events extracted from the recordings
              by spike sorting algorithms. This SpikeForest website addresses
              this need, assessing many popular spike sorting codes via "ground
              truth" recordings, which are the gold standard in terms of
              accuracy. We host a variety of experimental paired ground truth
              recordings from the community, and also many in silico synthetic
              recordings. Each sorter is run on all recordings, and the
              resulting accuracies for the ground truth units are updated on a
              daily basis as needed. Approximate CPU/GPU run times are also
              reported.
            </p>
            <p>
              This software is open source: you can browse all datasets,
              algorithms, sorting results, and comparisons, and inspect the
              source code used to generate these data. One goal is for
              neuroscientists to best choose the spike sorter appropriate for
              their probe type and brain region.
            </p>
          </div>
        </div>
        {loading ? (
          <Container id="overview">
            <Preloader />
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
