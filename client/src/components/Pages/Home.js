import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import HomeContentContainer from "../Heatmap/HomeContentContainer";
import { isEmpty } from "../../utils";
import { Container, Card } from "react-bootstrap";
import StatsAlert from "../Header/StatsAlert";
import InfoPanelContent from "../Header/InfoPanelContent";

import "./pages.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // unitsMap: {}
    };
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  getSorters() {
    // returns the unique names of the sorters
    return this.props.sorters
      .map(item => item.name)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  render() {
    // let loading =
    //   isEmpty(this.state.unitsMap) ||
    //   isEmpty(this.props.studies) ||
    //   isEmpty(this.props.sorters);
    let loading =
        isEmpty(this.props.sorters) ||
        isEmpty(this.props.studySets) ||
        isEmpty(this.props.studyAnalysisResults);
    if (loading) {
      window.scrollTo(0, 0);
    }

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
            // unitsMap={this.state.unitsMap}
          />
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
