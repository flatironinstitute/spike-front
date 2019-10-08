import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Col, Container, Row } from "react-bootstrap";

class About extends Component {
  render() {
    return (
      <div>
        <Container className="container-sidebar">
          <Row noGutters>
            <Col xl={2} md={3} sm={3} className="sidebar">
              <ul>
                <li>
                  <HashLink to="/about#test">Goto Cool Section</HashLink>
                </li>
                <li>
                  <a href="place">Thing</a>
                </li>
                <li>
                  <a href="place">Thing</a>
                </li>
              </ul>
            </Col>
            <Col xl={10} md={9} sm={12} className="page__body">
              <Container className="container__heatmap">
                <Row className="subcontainer justify-content-md-center">
                  <Col lg={12} sm={12} xl={12}>
                    <div className="intro">
                      <p className="big">About SpikeForest</p>
                    </div>
                  </Col>
                </Row>
                <Row className="subcontainer justify-content-md-center">
                  <Col lg={12} sm={12} xl={12}>
                    <div className="card card__std">
                      <div className="content">
                        <div className="card__label">
                          <p>
                            <strong>Overview</strong>
                          </p>
                        </div>
                        <div className="card__footer">
                          <hr />
                          <p>
                            Extracellular electrical recording is a popular and
                            affordable method to measure the simultaneous
                            spiking activity of a large neural population. The
                            key computational extraction of distinct neuronal
                            units and firing times is known as spike sorting.
                            However, there is a growing number of automated
                            spike sorting codes, and much uncertainty and
                            folklore about their accuracy in various
                            experimental conditions. Several papers report
                            comparisons on a case-by-case basis, but there is a
                            lack of standardized measures and validation data.
                            Furthermore, there is a potential for bias, such as
                            sub-optimal tuning of competing algorithms, and a
                            focus on one brain region or probe type. Without a
                            fair and transparent comparison, genuine progress in
                            the field remains difficult.
                          </p>
                          <p>
                            Aiming to address this need, SpikeForest is a
                            reproducible, continuously updating platform which
                            benchmarks the performance of spike sorting codes
                            across a large curated database of
                            electrophysiological recordings with ground truth.
                            It consists of this website for presenting our
                            up-to-date findings, a{" "}
                            <a
                              href="https://github.com/flatironinstitute/spikeforest"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Python package
                            </a>{" "}
                            which contains the tools for running the SpikeForest
                            analysis, and an expanding collection of
                            electrophysiology recordings with ground-truth
                            spiking information.
                          </p>
                          <p>
                            We host a variety of experimental paired ground
                            truth recordings from the community and also many in
                            silico synthetic recordings. Each sorter is run on
                            all recordings and the resulting accuracies for the
                            ground truth units are updated on a daily basis as
                            needed. Approximate CPU/GPU run times are also
                            reported.
                          </p>
                          <p>
                            Visitors may browse all datasets, algorithms,
                            sorting results, and comparisons, and inspect the
                            source code used to generate these data. Use the
                            links on the navbar to learn about{" "}
                            <Link to="/recordings">recordings</Link>,{" "}
                            <Link to="/algorithms">algorithms</Link>, and{" "}
                            <Link to="/metrics">metric definitions</Link>.
                          </p>
                          <p>
                            <b>Resources:</b>
                          </p>
                          <ul>
                            <li>
                              <Link exact="true" to="/news">
                                News
                              </Link>{" "}
                              - click here to learn the latest on the spike
                              sorting software and website.
                            </li>
                            <li>
                              <a
                                href="https://www.spikeforum.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Forum
                              </a>{" "}
                              - browse our new online community, ask questions
                              or make suggestions.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="subcontainer justify-content-md-center">
                  <Col lg={12} sm={12} xl={12}>
                    <div className="card card__std">
                      <div className="content">
                        <div className="card__label">
                          <p>
                            <strong>Tutorials</strong>
                          </p>
                        </div>
                        <div className="card__footer">
                          <hr />
                          <ul>
                            <li>
                              <a
                                href="https://github.com/flatironinstitute/spikeforest/blob/master/docs/tutorials/spike_sorting_spikeforest_recording.md"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Run these algorithms on your own computer to
                                reproduce the results.
                              </a>{" "}
                            </li>
                            <li>
                              <a
                                href="https://github.com/flatironinstitute/spikeforest/blob/master/docs/tutorials/spike_sorting_single_recording.md"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Run the SpikeForest-wrapped spike sorters on
                                your own data.
                              </a>{" "}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="subcontainer justify-content-md-center">
                  <Col lg={12} sm={12} xl={12}>
                    <div className="card card__std">
                      <div className="content">
                        <div className="card__label">
                          <p>
                            <strong>Feedback</strong>
                          </p>
                        </div>
                        <div className="card__footer">
                          <hr />
                          There are several ways to provide feedback, report
                          problems, or contact us with questions:
                          <ul>
                            <li>
                              {" "}
                              Join the online community{" "}
                              <a
                                href="https://www.spikeforum.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                SpikeForum
                              </a>{" "}
                              dedicated to supporting this open source spike
                              sorting software.
                            </li>
                            <li>
                              {" "}
                              You may email us using the{" "}
                              <Link exact="true" to="/contact">
                                contact form
                              </Link>{" "}
                              .
                            </li>
                            <li>
                              {" "}
                              If you prefer a more graphical/interactive way to
                              label problems or questions on a particular page,
                              click on the purple <b>FEEDBACK</b> tab in the
                              bottom-right corner of any page.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="subcontainer justify-content-md-center">
                  <Col lg={12} sm={12} xl={12}>
                    <div className="card card__std">
                      <div className="content">
                        <div className="card__label">
                          <p>
                            <strong>Credits</strong>
                          </p>
                        </div>
                        <div className="card__footer">
                          <hr />
                          <p>
                            SpikeForest is a project of the{" "}
                            <a
                              href="https://flatironinstitute.org"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Flatiron Institute
                            </a>{" "}
                            involving the{" "}
                            <a
                              href="https://www.simonsfoundation.org/flatiron/center-for-computational-mathematics/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Center for Computational Mathematics (CCM)
                            </a>{" "}
                            and the{" "}
                            <a
                              href="https://www.simonsfoundation.org/flatiron/scientific-computing-core/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Scientific Computing Core (SCC)
                            </a>
                            .
                          </p>
                          <ul>
                            <li>
                              Jeremy Magland, CCM (chief infrastructure
                              developer, backend analysis framework)
                            </li>
                            <li>
                              James Jun, CCM (infrastructure, testing, recording
                              preparation, and algorithm integration)
                            </li>
                            <li>
                              Elizabeth Lovero, SCC (site design, web
                              development, visualizations)
                            </li>
                            <li>Leslie Greengard, CCM (concept, planning)</li>
                            <li>
                              Alex Barnett, CCM (concept, planning, site design,
                              testing)
                            </li>
                          </ul>
                          <br />
                          <p>Other key contributors to the project include: </p>
                          <ul>
                            <li>
                              Alex Morley - Mozilla Fellow, MRC Brain Network
                              Dynamics Unit, University of Oxford, UK
                              (infrastructure, testing)
                            </li>
                            <li>
                              Witold Wysota - Warsaw, Poland (MountainTools
                              infrastructure, testing)
                            </li>
                          </ul>
                          <br />
                          <p>
                            File format conversions and some computations make
                            use of{" "}
                            <a
                              href={"https://github.com/SpikeInterface/"}
                              target={"_blank"}
                            >
                              SpikeInterface
                            </a>
                            . Over time we will expand our integration with this
                            project. It is under development by the following
                            individuals:
                          </p>
                          <ul>
                            <li>
                              Cole Hurwitz - The Institute for Adaptive and
                              Neural Computation (ANC), University of Edinburgh,
                              Edinburgh, Scotland
                            </li>
                            <li>
                              Alessio Paolo Buccino - Center for Inegrative
                              Neurolasticity (CINPLA), Department of
                              Biosciences, Physics, and Informatics, University
                              of Oslo, Oslo, Norway
                            </li>
                            <li>
                              Matthias Hennig - The Institute for Adaptive and
                              Neural Computation (ANC), University of Edinburgh,
                              Edinburgh, Scotland
                            </li>
                            <li>
                              Samuel Garcia - Centre de Recherche en
                              Neuroscience de Lyon (CRNL), Lyon, France
                            </li>
                            <li>
                              Jeremy Magland - Center for Computational
                              Mathematics, Flatiron Institute, New York, NY
                            </li>
                          </ul>
                          <br />
                          <p>
                            We are grateful for many collaborators at other
                            institutions for their vital help and supply of
                            recordings:
                          </p>
                          <ul>
                            <li> Frank Lab, UCSF</li>
                            <ul>
                              <li> Jason Chung (UCSF)</li>
                              <li> Loren Frank (UCSF)</li>
                            </ul>
                            <li> Allen Institute for Brian Science</li>
                            <ul>
                              <li> Catalin Mitelut (Columbia)</li>
                              <li> Sergey Gratiy (AIBS)</li>
                              <li> Costas Anastassiou (AIBS)</li>
                            </ul>
                            <li> Buzsaki Lab (NYU)</li>
                            <ul>
                              <li> Dan English (Virginia Tech)</li>
                              <li> Anton Sirota (LMU Munich)</li>
                              <li> György Buzsáki (NYU)</li>
                            </ul>
                            <li> Kampff Lab, UCL</li>
                            <ul>
                              <li> André Marques-Smith (UCL)</li>
                              <li> Joana P. Neto (UCL)</li>
                              <li> Adam R. Kampff (UCL)</li>
                            </ul>
                            <li> Boyden Lab, MIT</li>
                            <ul>
                              <li> Ed Boyden (MIT)</li>
                              <li> Brian D. Allen (MIT)</li>
                              <li> Caroline Moore-Kochlacs (MIT)</li>
                            </ul>
                            <li> Institute de la Vision, CNRS</li>
                            <ul>
                              <li> Pierre Yger (CNRS)</li>
                              <li> Giulia LB Spampinato (CNRS)</li>
                              <li> Olivier Marre (CNRS)</li>
                            </ul>
                            <li>
                              HHMI - Janelia Research Campus (hybrid drift
                              simulation)
                            </li>
                            <ul>
                              <li>Jennifer Colonell</li>
                              <li>Marius Pachitariu</li>
                            </ul>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="subcontainer justify-content-md-center">
                  <Col lg={12} sm={12} xl={12}>
                    <div className="card card__std">
                      <div className="content">
                        <div className="card__label">
                          <p>
                            <strong>Background and related projects</strong>
                          </p>
                        </div>
                        <div className="card__footer">
                          <hr />
                          <p>
                            This project is the fruition of a long-term goal
                            within the spike sorting effort of CCM, starting in
                            2014 at what was then SCDA (the Simons Center for
                            Data Analysis). The original spike sorting effort
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
                            community discussion on validation at the Janelia
                            spike sorting workshop of 3/22/18.
                          </p>
                          <p>
                            We were influenced (in terms of concept, features,
                            and site design) by many neuroscience and
                            non-neuroscience algorithm validation websites,
                            including:
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
                              for comparing clustering algorithms, including
                              parameter optimizations. Their publication is:
                              Wiwie, C., Röttger, R. & Baumbach, J. "Comparing
                              the performance of biomedical clustering methods,"
                              Nature Methods (2015).
                            </li>
                            <li>
                              <a
                                href="http://neurofinder.codeneuro.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                NeuroFinder,
                              </a>{" "}
                              by Jeremy Freeman, for calcium imaging spatial
                              neuron extraction comparison.
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
                              . A now-defunct 2011-2012 project where the user
                              uploads sorted data, which is compared against a
                              hidden ground truth sorting and optionally
                              published.
                            </li>
                            <li>
                              <a
                                href="http://phy.cortexlab.net/data/sortingComparison"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                cortexlab
                              </a>
                              , by N. Steinmetz. Comparison of several
                              algorithms on hybrid data.
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
                              Older list of spike sorting codes and their
                              features.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row
                  className="subcontainer justify-content-md-center"
                  id="test"
                >
                  <Col lg={12} sm={12} xl={12}>
                    <div className="card card__std">
                      <div className="content">
                        <div className="card__label">
                          <p>
                            <strong>Future plans</strong>
                          </p>
                        </div>
                        <div className="card__footer">
                          <hr />
                          <p>
                            We have many future plans, and welcome your
                            suggestions. Some of our future plans include:
                          </p>
                          <ol>
                            <li>Expanding the set of test recordings</li>
                            <li>
                              Parameter settings: more explicit control of
                              parameters for sorting algorithms, with possible
                              optimization.
                            </li>
                            <li>
                              Hybrid recordings: incorporate a new recording
                              class to complement the current <i>in vivo</i>,{" "}
                              <i>ex vivo</i>, and simulated recordings.
                            </li>
                            <li>
                              Expansion of SNR to other surrogate quality
                              metrics: display noise overlap, isolation, etc, as
                              used in MountainView.
                            </li>
                            <li>
                              Stability-based quality metrics: run sorters
                              multiple times to measure stability, as in our
                              work "Validation of neural spike sorting
                              algorithms without ground-truth information," A.
                              H. Barnett, J. F. Magland, and L. Greengard, J.
                              Neurosci. Meth., 264, 65--77 (2016).
                            </li>
                            <li>Further integration with SpikeInterface.</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default About;
