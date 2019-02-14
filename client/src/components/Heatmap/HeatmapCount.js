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

class HeatmapCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      builtData: [],
      accuracy: 0.8,
    };
  }

  componentDidMount() {
    if (this.props.unitsMap.length) {
      this.filterAccuracyMap();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.unitsMap !== prevProps.unitsMap ||
      this.state.accuracy !== prevState.accuracy
    ) {
      this.filterAccuracyMap();
    }
  }

  handleSliderChange = value => {
    this.setState({
      accuracy: value,
    });
  };

  // Count functions for 'Number of groundtruth units above accuracy threshold'
  filterAccuracy(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      let above = sorter.accuracies.filter(accu => {
        return accu >= this.state.accuracy;
      });
      sorter.in_range = above.length;
      sorter.color = above.length;
      return sorter;
    });
    return newArr;
  }

  filterAccuracyMap() {
    let built = this.props.unitsMap.map(study => {
      let values = Object.values(study)[0];
      let key = Object.keys(study)[0];
      let filtered = this.filterAccuracy(values);
      return { [key]: filtered };
    });
    this.setState({ builtData: built });
  }

  render() {
    let loading = isEmpty(this.state.builtData);
    if (!loading) {
      console.log('🏘️', this.state.builtData);
    }
    return (
      <div>
        {loading ? (
          <Container>
            <Preloader />
          </Container>
        ) : (
          <div>
            <Container>
              <Row className="slider__horizontal">
                <Col md={{ span: 6 }}>
                  <p className="byline">
                    <b>
                      Minimum accuracy:
                      {Math.round(this.state.accuracy * 100) / 100}
                    </b>
                  </p>
                </Col>
              </Row>
              <Row className="slider__horizontal">
                <Col md={{ span: 6 }}>
                  <Slider
                    min={0}
                    max={1}
                    value={this.state.accuracy}
                    step={0.05}
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
                    startTitle={'Least Units Found'}
                    endTitle={'Most Units Found'}
                    height={20}
                  />
                </div>
              </Row>
            </Container>
            <Container>
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
                    accuracy={this.state.accuracy}
                  />
                ) : (
                  <div />
                )}
              </div>
            </Container>
          </div>
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
)(HeatmapCount);
