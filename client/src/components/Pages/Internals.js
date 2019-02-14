import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './pages.css';

class Internals extends Component {
  render() {
    return (
      <div className="home__body">
        <div className="intro">
          <p className="big">Internals</p>
          <div className="dividerthick" />
          <p className="subhead">
            All code used internally by SpikeForest is open source and
            independently run-able. The system consists of the following:
          </p>
        </div>
        <div className="opener">
          <div className="prose-container">
            <h3>Set of spike sorting algorithms</h3>
            <p>
              Each algorithm consists of the following:
              <ul>
                <li>
                  Environment: A docker file and image representing the
                  environment required for running the software.[Link to
                  details]
                </li>
                <li>
                  Python wrapper: A MountainLab processor used to execute the
                  software. [link to details]
                </li>
              </ul>
              As a secondary goal, reseachers may use the SpikeForest
              infrastructure to run spike sorting on their own computers. [link
              to details]
            </p>
            <h3>
              Registered ground truth recordings organized into studies and
              study sets
            </h3>
            <p>
              Recordings are represented in a simple flat format and are
              publicly available. [link to details]
            </p>
            <p>
              Recordings or portions thereof may be downloaded using the
              kbucket/cairio python interface. [link to details]
            </p>
            <p>
              The SpikeInterface [link] tools provide a means to convert
              electrophysiology recordings from various formats into the format
              used by SpikeForest. [link to details]
            </p>
            <h3>Analysis pipelines</h3>
            <p>
              SpikeForest includes scripts for running the registered spike
              sorting algorithms (with various parameters) on the registered
              recordings, comparing the sorting results with ground truth, and
              assembling the results into publicly-accessible result files that
              provide the content for the front-end website. [link to details]
            </p>
            <p>
              To promote reproducibility and scientific transparency, all
              analysis pipelines are open source, publicly available, and may be
              run outside the SpikeForest infrastructure in order to
              independently reproduce the findings of this website. [link to
              details]
            </p>
            <h3>This front-end website</h3>
            <p>
              Site for exploring recordings, spike sorting algorithms, and
              sorting results [Liz Add Copy]
            </p>
          </div>
        </div>
        <Container id="diagrams">
          <Row>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '5.2rem',
              }}
            >
              <p className="updated">
                TODO: Diagram of dependence of repos and tools
              </p>
            </Col>
          </Row>
        </Container>
        />
      </div>
    );
  }
}
export default Internals;
