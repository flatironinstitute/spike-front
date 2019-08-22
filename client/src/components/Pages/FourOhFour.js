import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

class FourOhFour extends Component {
  render() {
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <div className="card card--heatmap text-center">
            <h2> It seems you are lost</h2>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Link to="/">
                  Let's go Home <br />
                </Link>
              </Col>
            </Row>
            <img
              className="card__image"
              width="auto"
              height="auto"
              src="https://media.giphy.com/media/xTiN0L7EW5trfOvEk0/giphy.gif"
              alt="gif"
            />
          </div>
        </Container>
      </div>
    );
  }
}
export default FourOhFour;
