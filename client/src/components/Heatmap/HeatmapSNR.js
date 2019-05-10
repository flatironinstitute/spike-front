import React, { Component } from "react";
import { isEmpty } from "../../utils";
import { Redirect } from "react-router";

// Components
import Preloader from "../Preloader/Preloader";
import { Col, Container, Row } from "react-bootstrap";
import HeatmapViz from "./HeatmapViz";
import ScatterplotCard from "../ScatterplotBits/ScatterplotCard";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

// Stylin'
import "./heatmap.css";

class HeatmapSNR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHeight: null,
      redirect: false
    };
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  handleCardHeightChange = value => {
    this.setState({
      cardHeight: value
    });
  };

  handleScatterplotClick = value => {
    this.setState({ redirect: true });
  };

  render() {
    let loading = isEmpty(this.props.studyAnalysisResults);
    let study = this.props.selectedStudyName || "";
    study = "/study/" + study;
    if (this.state.redirect) {
      return <Redirect push to={study} />;
    }
    return (
      <div>
        {loading ? (
          <Container>
            <Preloader />
          </Container>
        ) : (
          <Container className="container__heatmap">
            <Row className="container__heatmap--row">
              <Col lg={6} sm={12}>
                <HeatmapViz
                  selectStudyName={this.props.selectStudyName}
                  selectSorterName={this.props.selectSorterName}
                  selectedStudyName={this.props.selectedStudyName}
                  selectedSorterName={this.props.selectedSorterName}
                  groupedUnitResults={this.state.builtData}
                  studyAnalysisResults={this.props.studyAnalysisResults}
                  studies={this.props.studies}
                  studysets={this.props.studysets}
                  format={this.props.format}
                  metric={this.props.metric}
                  threshold={this.props.snrMin}
                  handleCardHeightChange={this.handleCardHeightChange}
                />
              </Col>
              <Col lg={6} sm={12}>
                <ScatterplotCard
                  {...this.props}
                  sliderValue={this.props.snrMin}
                  cardHeight={this.state.cardHeight}
                />
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedStudyName: state.selectedStudyName,
    selectedSorterName: state.selectedSorterName,
    selectedRecording: state.selectedRecording
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeatmapSNR);
