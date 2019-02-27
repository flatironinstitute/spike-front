import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./pages.css";

class FourOhFour extends Component {
  render() {
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <div className="card card--heatmap text-center">
            <h2>Uh-oh! We can't find that page.</h2>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Link to="/">
                  Go Home{" "}
                  <span role="img" aria-label="golf-hole">
                    ⛳
                  </span>
                  <br />
                </Link>
              </Col>
            </Row>
            <img
              className="card__image"
              width="480"
              height="363"
              src="https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif"
              alt="gif"
            />
          </div>
        </Container>
      </div>
    );
  }
}
export default FourOhFour;
