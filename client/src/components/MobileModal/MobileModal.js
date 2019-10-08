import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class Preloader extends Component {
  render() {
    return (
      <Modal
        centered
        show={this.props.show}
        onHide={this.props.handleModalClose}
      >
        <Modal.Header>
          <Modal.Title>Mobile Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          SpikeForest is <b>not</b> optimized for mobile viewing. Please visit
          again on a larger device.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleModalClose}>
            Visit the site anyway
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Preloader;
