import React, { Component } from "react";
import { isEmpty } from "../../utils";
import { Container, Card } from "react-bootstrap";
import StatsAlert from "../Header/StatsAlert";
import InfoPanelContent from "../Header/InfoPanelContent";
import Preloader from "../Preloader/Preloader";
import HomeContentContainer from "../Heatmap/HomeContentContainer";
import { isMobile } from "react-device-detect";

class Home extends Component {
  render() {
    let loading =
      isEmpty(this.props.sorters) ||
      isEmpty(this.props.studySets) ||
      isEmpty(this.props.studyAnalysisResults);
    if (loading) {
      window.scrollTo(0, 0);
    }

    return (
      <div className="page__body page__body--alert ">
        <StatsAlert
          sortingResults={this.props.sortingResults}
          studySets={this.props.studySets}
          general={this.props.general}
        />
        {loading ? (
          <Container className="container__heatmap" id="overview">
            <Card>
              <Card.Body>
                <Preloader />
              </Card.Body>
            </Card>
          </Container>
        ) : (
          <HomeContentContainer id="overview" {...this.props} />
        )}
        <Container className="container__heatmap">
          <Card>
            <Card.Body>
              <InfoPanelContent sidebar={false} />
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
export default Home;
