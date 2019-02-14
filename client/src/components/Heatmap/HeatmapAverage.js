import React, { Component } from 'react';
import HeatmapViz from './HeatmapViz';
import { isEmpty } from '../../utils';
import { ContinuousColorLegend } from 'react-vis';

// Components
import Preloader from '../Preloader/Preloader';
import StudySorterSummary from '../ScatterplotBits/StudySorterSummary';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

// Stylin'
import './heatmap.css';

class HeatmapAverage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      builtData: [],
      snrMin: 5,
    };
  }

  componentDidMount() {
    if (this.props.unitsMap.length) {
      this.filterSNRMap();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.unitsMap !== prevProps.unitsMap ||
      this.state.snrMin !== prevState.snrMin
    ) {
      this.filterSNRMap();
    }
  }

  // Average functions for 'Average accuracy of groundtruth units above SNR threshold'
  filterSNR(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      let accs = [];
      sorter.true_units.forEach(unit => {
        if (unit.snr > this.state.snrMin) {
          accs.push(unit.accuracy);
        }
      });
      let aboveAvg = 0;
      if (accs.length) {
        let sum = accs.reduce((a, b) => a + b);
        aboveAvg = sum / accs.length;
      }
      // This just prints the output to 2 digits
      sorter.in_range = Math.round(aboveAvg * 100) / 100;
      sorter.color = Math.round(aboveAvg * 100) / 100;
      return sorter;
    });
    return newArr;
  }

  filterSNRMap() {
    let built = this.props.unitsMap.map(study => {
      let values = Object.values(study)[0];
      let key = Object.keys(study)[0];
      let filtered = this.filterSNR(values);
      return { [key]: filtered };
    });
    this.setState({ builtData: built });
  }

  handleAccuracyChange = value => {
    this.setState({
      snrMin: value,
    });
  };

  render() {
    let loading = isEmpty(this.state.builtData);
    return (
      <div>
        {loading ? (
          <Container>
            <Preloader />
          </Container>
        ) : (
          <Container>
            <Row className="slider__horizontal">
              <Col md={{ span: 6 }}>
                <p className="byline">
                  <b>Minimum SNR: {this.state.snrMin}</b>
                </p>
              </Col>
            </Row>
            <Row className="slider__horizontal">
              <Col md={{ span: 6 }}>
                <Slider
                  min={0}
                  max={50}
                  value={this.state.snrMin}
                  step={1}
                  orientation="horizontal"
                  onChange={this.handleSliderChange}
                />
              </Col>
            </Row>
            <Row>
              <div className="heatmap__legend">
                <ContinuousColorLegend
                  width={580}
                  startColor={'#fafafd'}
                  endColor={'#384ca2'}
                  startTitle={'Lowest Average Accuracy'}
                  endTitle={'Highest Average Accuracy'}
                  height={20}
                />
              </div>
            </Row>
            <div className="scrollyteller__container">
              <HeatmapViz
                {...this.props}
                filteredData={this.state.builtData}
                sorters={this.props.shortSorters}
                format={this.props.format}
              />
              {this.props.selectedStudy ? (
                <StudySorterSummary
                  {...this.props}
                  accuracy={this.state.snrMin}
                />
              ) : (
                <div />
              )}
            </div>
          </Container>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedStudy: state.selectedStudy,
    selectedRecording: state.selectedRecording,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeatmapAverage);
