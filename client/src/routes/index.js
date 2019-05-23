import React, { Component } from "react";
import { Route, Switch } from "react-router";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";

import { Card, Container } from "react-bootstrap";
import Preloader from "../components/Preloader/Preloader";

// import components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import Home from "../components/Pages/Home";
import About from "../components/Pages/About";
import Recordings from "../components/Pages/Recordings";
import Studies from "../components/Pages/Studies";
import Algorithms from "../components/Pages/Algorithms";
import Metrics from "../components/Pages/Metrics";
import Contact from "../components/Contact/Contact";
import DetailPage from "../components/DetailPage/DetailPage";
import StudySet from "../components/Pages/StudySet";
import FourOhFour from "../components/Pages/FourOhFour";

class Routes extends Component {
  async componentDidMount() {
    // V2 Data: Fetches
    this.props.fetchCPUs();
    this.props.fetchStudies();
    this.props.fetchSortingResults();
    this.props.fetchSorters();
    this.props.fetchAlgorithms();
    this.props.fetchStats();
    this.props.fetchStudySets();
    this.props.fetchRecordings();
    this.props.fetchStudyAnalysisResults();
  }

  render() {
    let loadingContainer = (
      <div className="page__body">
        <Container className="container__heatmap">
          <Card>
            <Card.Body>
              <Preloader />
            </Card.Body>
          </Card>
        </Container>
      </div>
    );

    return (
      <div className="wrapper">
        <Header />
        <Switch>
          <Route exact path="/" render={props => <Home {...this.props} />} />
          <Route path="/about" render={props => <About {...this.props} />} />
          <Route
            path="/contact"
            render={props => <Contact {...this.props} />}
          />
          <Route
            path="/metrics"
            render={props => <Metrics {...this.props} />}
          />
          <Route
            path="/recordings"
            render={props => <Recordings {...this.props} />}
          />
          <Route
            path="/algorithms"
            render={props => <Algorithms algorithms={this.props.algorithms} />}
          />
          <Route
            path="/studies"
            render={props => <Studies {...this.props} />}
          />
          <Route
            path="/studyresults/:studyName"
            render={props => 
              (!this.props.studyAnalysisResults) ||
              (!this.props.studies) ||
              (!this.props.sorters) ||
              (!this.props.studysets) ? (loadingContainer) :
              (
                <DetailPage
                  studyName={props.match.params.studyName}
                  sorterName={this.props.selectedSorterName}
                  studyAnalysisResults={this.props.studyAnalysisResults}
                  studies={this.props.studies}
                  recordings={this.props.recordings}
                  sortingResults={this.props.sortingResults}
                  sorters={this.props.sorters}
                  studysets={this.props.studysets}
                />
              )
            }
          />
          <Route
            path="/studyset/:studySetName"
            render={props => 
              (!this.props.studysets) ? (loadingContainer) :
              (
                <StudySet
                  studysets={this.props.studysets}
                  studySetName={props.match.params.studySetName}
                />
              )
            }
          />
          <Route render={props => <FourOhFour {...this.props} />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
    algorithms: state.algorithms,
    contactSent: state.contactSent,
    cpus: state.cpus,
    loading: state.loading,
    recordings: state.recordings,
    sortingResults: state.sortingResults,
    sorters: state.sorters,
    stats: state.stats,
    studies: state.studies,
    studysets: state.studysets,
    selectedStudySortingResult: state.selectedStudySortingResult,
    selectedStudyName: state.selectedStudyName,
    selectedSorterName: state.selectedSorterName,
    studyAnalysisResults: state.studyAnalysisResults
  };
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
