import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Col, Container, Row } from "react-bootstrap";

class About extends Component {
  render() {
    const listItems = [
      { name: "Overview", value: "overview" },
      { name: "Resources", value: "resources" },
      { name: "Tutorials", value: "tutorials" },
      { name: "Feedback", value: "feedback" },
      { name: "Credits", value: "credits" },
      { name: "References", value: "references" },
      { name: "Background", value: "background" },
      { name: "Future plans", value: "futureplans" }
    ];
    return (
      <div>
        <Container className="container-sidebar">
          <Row noGutters>
            <Col xl={2} md={3} sm={12} className="sidebar">
              <Sidebar listItems={listItems} listTitle={"About"} />
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
                <div className="finder" id="overview" />
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
                              href="https://github.com/flatironinstitute/spikeforest2"
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
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="finder" id="resources" />
                <Row className="subcontainer justify-content-md-center">
                  <Col lg={12} sm={12} xl={12}>
                    <div className="card card__std">
                      <div className="content">
                        <div className="card__label">
                          <p>
                            <strong>Resources</strong>
                          </p>
                        </div>
                        <div className="card__footer">
                          <hr />
                          <ul>
                            <li>
                              <Link exact="true" to="/news">
                                News
                              </Link>{" "}
                              - click here to learn the latest on the spike
                              sorting software and website.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="finder" id="tutorials" />
                <Row className="subcontainer justify-content-md-center">
                  <Col lg={12} sm={12} xl={12}>
                    <div className="card card__std">
                      <div className="content">
                        <div className="card__label">
                          <p>
                            <strong>Running SpikeForest locally</strong>
                          </p>
                        </div>
                        <div className="card__footer">
                          <hr />
                          <ul>
                            <li>
                              For information on reproducing the results reported on the webpage or running the SpikeForest-wrapped sorters on your own data, see the
                              <a
                                href="https://github.com/flatironinstitute/spikeforest2"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                SpikeForest2 Python package
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="finder" id="feedback" />
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
                <div className="finder" id="credits" />
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
                <div className="finder" id="references" />
                <Row className="subcontainer justify-content-md-center">
                  <Col lg={12} sm={12} xl={12}>
                    <div className="card card__std">
                      <div className="content">
                        <div className="card__label">
                          <p>
                            <strong>References</strong>
                          </p>
                        </div>
                        <div className="card__footer">
                          <hr />
                          <p>
                            [1] F. J. Chaure, H. G. Rey, and R. Quian Quiroga. A
                            novel and fully automatic spike-sorting
                            implementation with variable number of
                            features.Journal of neurophysiol-ogy,
                            120(4):1859–1871, 2018.
                          </p>
                          <p>
                            [2] J. E. Chung, J. F. Magland, A. H. Barnett, et
                            al. A fully automated approach to
                            spikesorting.Neuron, 95(6):1381–1394, 2017.
                          </p>
                          <p>
                            [3] S. Garcia and C. Pouzat.
                            Tridesclous.https://github.com/tridesclous/tridesclous.
                          </p>
                          <p>
                            [4] G. Hilgen, M. Sorbaro, S. Pirmoradian, J.-O.
                            Muthmann, I. E. Kepiro, S. Ullo, C. J.Ramirez, A. P.
                            Encinas, A. Maccione, L. Berdondini, et al.
                            Unsupervised spike sort-ing for large-scale,
                            high-density multielectrode arrays.Cell reports,
                            18(10):2521–2532, 2017.
                          </p>
                          <p>
                            [5] J. J. Jun, C. Mitelut, C. Lai, S. Gratiy, C.
                            Anastassiou, and T. D. Harris. Real-time spike
                            sorting platform for high-density extracellular
                            probes with ground-truthvalidation and drift
                            correction.bioRxiv, page 101030, 2017.
                          </p>
                          <p>
                            [6] J. J. Jun, N. A. Steinmetz, J. H. Siegle, D. J.
                            Denman, M. Bauza, B. Barbarits, A. K.Lee, C. A.
                            Anastassiou, A. Andrei, Ç. Aydın, et al. Fully
                            integrated silicon probesfor high-density recording
                            of neural activity.Nature, 551(7679):232, 2017.
                          </p>
                          <p>
                            [7] M. Pachitariu, N. A. Steinmetz, and J. Colonell.
                            Kilosort2.https://github.com/MouseLand/Kilosort2.
                          </p>
                          <p>
                            [8] R. Q. Quiroga, Z. Nadasdy, and Y. Ben-Shaul.
                            Unsupervised spike detection andsorting with
                            wavelets and superparamagnetic clustering.Neural
                            computation,16(8):1661–1687, 2004.
                          </p>
                          <p>
                            [9] P. Yger, G. L. Spampinato, E. Esposito, B.
                            Lefebvre, S. Deny, C. Gardella, M. Stim-berg, F.
                            Jetter, G. Zeck, S. Picaud, et al. A spike sorting
                            toolbox for up to thou-sands of electrodes validated
                            with ground truth recordings in vitro and in
                            vivo.Elife,7:e34518, 2018.
                          </p>
                          <p>
                            [10] M. J. Zaki and W. Meira Jr.Data mining and
                            analysis: fundamental concepts andalgorithms.
                            Cambridge University Press, New York, NY, 2014.12
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="finder" id="background" />
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
                <div className="finder" id="futureplans" />
                <Row className="subcontainer-final justify-content-md-center">
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
