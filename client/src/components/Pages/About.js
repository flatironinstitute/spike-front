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
                </div>
            </Col>
          </Row>
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Feedback</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                      There are at least three ways to provide feedback, report problems, or contact us with questions:
                      <ul>
                       <li> You may email us using the
                          <Link exact="true" to="/contact">
                          contact form
                          </Link>{" "}.
                       <li> For website problems, please use the
                        <a
                           href="https://github.com/elovero/spike-front/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                         Github issues
                        </a>{" "}
                        page for the front end.
                       <li> If you prefer a more graphical/interactive way to label problems or questions on a particular page, click on UserSnap in the bottom-right corner of any page.
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
                      <strong>Credits</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                  <hr />
                   <p>
                   SpikeForest is a project of the Flatiron Institute, involving
                   the Center for Computational Mathematics and the Scientific Computing Core.
                   </p>
                    <ul>
                      <li>
                       Jeremy Magland, CCM (chief infrastructure developer,
                        back-end, recording simulation)
                      </li>{" "}
                      <li>
                        Elizabeth Lovero, SCC (site design, web development,
                        visualizations)
                      </li>
                      <li>
                        James Jun, CCM (infrastructure, testing, recording
                                   wrangling and simulation)
                      </li>
                      <li>Alex Barnett, CCM (concept, site design, testing)</li>
                    </ul>
                    <p>
                    We are grateful for many collaborators at other
                    institutions for their vital help and supply of recordings:
                    </p>
            <ul>
            <li> Frank Lab, UCSF
            <ul><li> Jason Chung (UCSF)
            <li> Loren Frank (UCSF)
        </ul>
            <li> Allen Institute for Brian Science
            <ul><li> Catalin Mitelut (Columbia)
            <li> Sergey Gratiy (AIBS)
            <li> Costas Anastassiou (AIBS)
        </ul>
            <li> Buzsaki Lab (NYU)
            <ul><li> Dan English (Virginia Tech)
            <li> Anton Sirota (LMU Munich)
            <li> György Buzsáki (NYU)
        </ul>
            <li> Kampff Lab, UCL
            <ul><li> André Marques-Smith (UCL)
            <li> Joana P. Neto (UCL)
            <li> Adam R. Kampff (UCL)
        </ul>
            <li> Boyden Lab, MIT
            <ul><li> Ed Boyden (MIT)
            <li> Brian D. Allen (MIT)
            <li> Caroline Moore-Kochlacs (MIT)
        </ul> 
            <li> Institute de la Vision, CNRS
            <ul><li> Pierre Yger (CNRS)
            <li> Giulia LB Spampinato (CNRS)
            <li> Olivier Marre (CNRS)
        </ul>
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
                      <strong>Background and related projects</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <p>
                      This project is the fruition of a long-term goal within
                      the spike sorting effort of CCM, starting in 2014 at what
                       was then SCDA (the Simons Center for Data Analysis). The original spike sorting effort
                      comprised Jeremy Magland, Alex Barnett, and Leslie
                      Greengard, and collaborators in Loren Frank's lab.
                    </p>
                    <p>
                      Design principles were outlined in our{" "}
                      <a
                        href="https://github.com/flatironinstitute/spikesortercomparison"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        white paper
                      </a>{" "}
                      of May 2018. This was inspired in part by a
                      community discussion on validation at the Janelia spike sorting workshop
                      of 3/22/18.
                    </p>
                    <p>We were influenced (in terms of concept, features, and site design) by many neuroscience and non-neuroscience algorithm validation websites, including:
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
                        for comparing clustering algorithms, including parameter optimizations.
                        Their publication is: Wiwie, C., Röttger, R. & Baumbach, J. "Comparing the
                        performance of biomedical clustering methods," Nature
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
                        . A now-defunct 2011-2012 project where the user uploads
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
                      <strong>Future plans</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <p>We have many future plans, and welcome your suggestions. Some of our future plans include:</p>
                    <ol>
                      <li>Parameter settings: more explicit control of parameters for sorting algorithms, with possible optimization.</li>
                      <li>Hybrid recordings: incorporate a new recording class to complement the current in vivo, ex vivo, and simulated recordings.</li>
                      <li>
                        Expansion of SNR to other surrogate quality metrics: display noise
                        overlap, isolation, etc, as used in MountainView.
                      </li>
                      <li>Stability-based quality metrics: run sorters multiple times to measure stability, as in our work "Validation of neural spike sorting algorithms without ground-truth information," A. H. Barnett, J. F. Magland, and L. Greengard, J. Neurosci. Meth., 264, 65--77 (2016).
                      </li>
                    </ol>
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
