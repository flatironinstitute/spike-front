import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

class ListCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("🐊", this.props.value);
    return (
      <Col lg={12} sm={12} xl={12}>
        oh hello
      </Col>
    );
  }
}
export default ListCard;
