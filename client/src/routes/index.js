import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { isMobile } from "react-device-detect";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";

import { Card, Container } from "react-bootstrap";
import Preloader from "../components/Preloader/Preloader";

// import components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MobileModal from "../components/MobileModal/MobileModal";

import Home from "../components/Pages/Home";
import About from "../components/Pages/About";
import Recordings from "../components/Pages/Recordings";
import Studies from "../components/Pages/Studies";
import Algorithms from "../components/Pages/Algorithms";
import Metrics from "../components/Pages/Metrics";
import Archive from "../components/Pages/Archive";
import News from "../components/Pages/News";
import Contact from "../components/Contact/Contact";
import DetailPage from "../components/DetailPage/DetailPage";
import StudySet from "../components/Pages/StudySet";
import Study from "../components/Pages/Study";
import Recording from "../components/Pages/Recording";
import SortingResult from "../components/Pages/SortingResult";
import FourOhFour from "../components/Pages/FourOhFour";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.handleModalClose = this.handleModalClose.bind(this);
  }
  async componentDidMount() {
    // V2 Data: Fetches
    this.props.fetchGeneral();
    this.props.fetchNewsPosts();
    this.props.fetchCPUs();
    this.props.fetchSortingResults();
    this.props.fetchSorters();
    this.props.fetchAlgorithms();
    this.props.fetchStats();
    this.props.fetchStudySets();

    if (isMobile) {
      this.setState({ showModal: true });
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.studySets !== prevProps.studySets) {
      if (this.props.studySets) {
        for (let studySet of this.props.studySets) {
          this.props.fetchStudyAnalysisResults(studySet.name);
        }
      }
    }
  }

  handleModalClose() {
    this.setState({ showModal: false });
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
        <MobileModal
          show={this.state.showModal}
          handleModalClose={this.handleModalClose}
        />
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
            render={props => <Recordings studySets={this.props.studySets} />}
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
              !this.props.studyAnalysisResults ||
              !this.props.sorters ||
              !this.props.studySets ? (
                loadingContainer
              ) : (
                <DetailPage
                  studyName={props.match.params.studyName}
                  sorterName={this.props.selectedSorterName}
                  studyAnalysisResults={this.props.studyAnalysisResults}
                  sortingResults={this.props.sortingResults}
                  sorters={this.props.sorters}
                  studySets={this.props.studySets}
                />
              )
            }
          />
          <Route
            path="/studyset/:studySetName"
            render={props =>
              !this.props.studySets ? (
                loadingContainer
              ) : (
                <StudySet
                  studySets={this.props.studySets}
                  studySetName={props.match.params.studySetName}
                />
              )
            }
          />
          <Route
            path="/study/:studyName"
            render={props =>
              !this.props.studySets ? (
                loadingContainer
              ) : (
                <Study
                  studySets={this.props.studySets}
                  studyName={props.match.params.studyName}
                />
              )
            }
          />
          <Route
            path="/recording/:studyName/:recordingName"
            render={props =>
              !this.props.studySets || !this.props.sortingResults ? (
                loadingContainer
              ) : (
                <Recording
                  studySets={this.props.studySets}
                  sortingResults={this.props.sortingResults}
                  studyName={props.match.params.studyName}
                  recordingName={props.match.params.recordingName}
                />
              )
            }
          />
          <Route
            path="/sortingresult/:studyName/:recordingName/:sorterName"
            render={props =>
              !this.props.studySets || !this.props.sortingResults ? (
                loadingContainer
              ) : (
                <SortingResult
                  studySets={this.props.studySets}
                  sorters={this.props.sorters}
                  sortingResults={this.props.sortingResults}
                  studyName={props.match.params.studyName}
                  recordingName={props.match.params.recordingName}
                  sorterName={props.match.params.sorterName}
                  general={this.props.general}
                />
              )
            }
          />
          <Route
            path="/archive"
            render={props => <Archive general={this.props.general} />}
          />
          <Route
            path="/news"
            render={props => <News newsPosts={this.props.newsPosts} />}
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
    format: state.format,
    loading: state.loading,
    metric: state.metric,
    newsPosts: state.newsPosts,
    selectedUnit: state.selectedUnit,
    sliderValue: state.sliderValue,
    sortingResults: state.sortingResults,
    sorters: state.sorters,
    stats: state.stats,
    studySets: state.studySets,
    selectedStudySortingResult: state.selectedStudySortingResult,
    selectedStudyName: state.selectedStudyName,
    selectedSorterName: state.selectedSorterName,
    studyAnalysisResults: state.studyAnalysisResults,
    general: state.general
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
