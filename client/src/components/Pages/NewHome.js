import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import { Container, Card } from "react-bootstrap";
import NewHomeContentContainer from "../Heatmap/NewHomeContentContainer";

import "./pages.css";

class NewHome extends Component {
  render() {
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
          <NewHomeContentContainer
            id="overview"
            {...this.props}
            // shortStudies={studies}
            // shortSorters={sorters}
            // unitsMap={this.state.unitsMap}
          />
        )}
      </div>
    );
  }
}
export default NewHome;
