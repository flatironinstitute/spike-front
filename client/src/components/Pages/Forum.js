import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <a
            href={"https://spikeforum.org"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open SpikeForest/SpikeInterface forum in new tab
          </a>
        </Container>
      </div>
    );
  }
}

export default Forum;
