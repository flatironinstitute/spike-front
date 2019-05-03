import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

class About extends Component {
  render() {
    let divStyle = {
      backgroundColor: "#fffdc0",
      borderRadius: "5px",
      display: "inline-block"
    };
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <Row className="justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="intro">
                <p className="big">About SpikeForest</p>
                <div className="dividerthick" />
                <p className="subhead">
                  Project of the Center for Computational Mathematics, Flatiron
                  Institute
                </p>
                <p className="byline">
                  Please use the
                  <a
                    href="https://github.com/elovero/spike-front/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github issues
                  </a>{" "}
                  page to report website problems or
                  <Link exact="true" to="/contact">
                    contact
                  </Link>{" "}
                  us directly.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Credits</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <ul>
                      <li>
                        Jeremy Magland (chief infrastructure developer,
                        back-end, recording simulation)
                      </li>{" "}
                      <li>
                        Elizabeth Lovero (site design and web development,
                        visualizations)
                      </li>
                      <li>
                        James Jun (infrastructure, testing, and recording
                        wrangling and simulation)
                      </li>
                      <li>Alex Barnett (concept and site design, testing)</li>
                    </ul>
                    <p>
                      We are grateful for many collaborators at other
                      institutions for their vital help:
                    </p>
                    <ul>
                      <li>Jason Chung (UCSD) </li>
                      <li>Dan English (VT)</li>
                      <li>Loren Frank (UCSD)</li>
                      <li>Catalin Mitelut (Columbia)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>History and Future</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <p>
                      This project is the fruition of a long-term goal within
                      the spike sorting effort of CCM, starting in 2014 at what
                      was then the SCDA. The original spike sorting effort
                      comprised Jeremy Magland, Alex Barnett, and Leslie
                      Greengard, and collaborators in Loren Frank's lab.
                    </p>
                    <p>
                      Early design principles were outlined in our{" "}
                      <a
                        href="https://github.com/flatironinstitute/spikesortercomparison"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        white paper
                      </a>{" "}
                      of May 2018. This was inspired in part a spike-sorting
                      community discussion at the Janelia spike sorting meeting
                      of 3/22/18.
                    </p>
                    <ul>
                      <li>
                        <a
                          href="https://clusteval.sdu.dk/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ClustEval website
                        </a>{" "}
                        Wiwie, C., Röttger, R. & Baumbach, J. Comparing the
                        performance of biomedical clustering methods. Nature
                        Methods (2015).
                      </li>
                      <li>
                        <a
                          href="http://neurofinder.codeneuro.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          NeuroFinder,
                        </a>{" "}
                        by Jeremy Freeman, for calcium imaging spatial neuron
                        extraction comparison.
                      </li>
                      <li>
                        <a
                          href="http://spikefinder.codeneuro.org"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          SpikeFinder
                        </a>
                        , by P. Berens, for extracting spikes from calcium
                        imaging fluorescence curves.
                      </li>
                      <li>
                        <a
                          href="http://spike.g-node.org"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          G-Node
                        </a>
                        . A now-defunct 2011-2012 project wher the user uploads
                        sorted data, which is compared against a hidden ground
                        truth sorting and optionally published.
                      </li>
                      <li>
                        <a
                          href="http://phy.cortexlab.net/data/sortingComparison"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          cortexlab
                        </a>
                        , by N. Steinmetz. Comparison of several algorithms on
                        hybrid data.
                      </li>
                      <li>
                        <a
                          href="http://www.spikesortingtest.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Spikesortingtest
                        </a>{" "}
                        by C. Mitelut.
                      </li>
                      <li>
                        <a
                          href="http://simonster.github.io/SpikeSortingSoftware"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          SpikeSortingSoftware
                        </a>{" "}
                        Older list of spike sorting codes and their features.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Related Projects</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <p style={divStyle}>[Please add these details]</p>
                    <ul>
                      <li>Project 1</li>
                      <li>Project 2</li>
                      <li>Project 3</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Future plans</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <ul>
                      <li>Hybrid recordings</li>
                      <li>
                        Expansion of SNR to other surrogate metrics: noise
                        overlap, etc.
                      </li>
                      <li>Stability-based quality metrics.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Changelog for website</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <p style={divStyle}>[June 2019 : release v 1.0]</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default About;
