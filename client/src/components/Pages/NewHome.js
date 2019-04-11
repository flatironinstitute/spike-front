import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import { isEmpty } from "../../utils";
import { Card, Container } from "react-bootstrap";
import NewHomeContentContainer from "../Heatmap/NewHomeContentContainer";

import "./pages.css";

class NewHome extends Component {
  componentDidUpdate(prevProps, prevState) {
    // if (this.props.cpus !== prevProps.cpus) {
    //   console.log("🦓 cpus", this.props.cpus);
    // }
  }

  render() {
    // TODO: Put groupedURs back into loading
    let loading = isEmpty(this.props.cpus);
    return (
      <div className="page__body">
        {loading ? (
          <Container fluid className="container__home">
            <Card>
              <Card.Body>
                <Preloader />
              </Card.Body>
            </Card>
          </Container>
        ) : (
          <NewHomeContentContainer {...this.props} />
        )}
      </div>
    );
  }
}
export default NewHome;
