import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MathJax from "react-mathjax";

import "./pages.css";

class Metrics extends Component {
  render() {
    // const tex = `f(x) = \\int_{-\\infty}^\\infty
    // \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    // \\,d\\xi`;

    const groundtruth = ` n_box{match}^k := # {i: |t_j^k-s_i| < \\Delta t mbox{ for some } j}`;
    let divStyle = {
      backgroundColor: "#fffdc0",
      borderRadius: "5px",
      display: "inline-block"
    };
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <Row>
            <Col lg={12} sm={12}>
              <div className="intro">
                <p className="big">Metrics</p>
                <div className="dividerthick" />
                <p className="subhead">
                  Definitions of accuracy and other metrics used throughout
                  SpikeForest.
                </p>
                <p className="updated">
                  Does the May 9, 2018 paper include these definitions? If so,
                  should I link to it here?
                </p>
              </div>
            </Col>
          </Row>
          <Row className="container__sorter--row">
            <Col lg={12} sm={12}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Matching of Firing Events</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <MathJax.Provider>
                      <p>
                        We first describe how labeled firing events output by a
                        sorter are matched to a given list of ground truth
                        events, with firing times{" "}
                        <MathJax.Node
                          inline
                          formula={`s_i, i=1,\\dots,n_{GT}`}
                        />
                        . Consider the sorted unit labeled{" "}
                        <MathJax.Node inline formula={"k"} />. Let{"  "}
                        <MathJax.Node
                          inline
                          formula={`t_j^k for j=1,\\dots,n_k`}
                        />{" "}
                        be the firing times of this unit from the sorter. Let
                        {"  "}
                        <MathJax.Node inline formula={`\\Delta t`} /> be an
                        acceptable firing time error, which we assume is shorter
                        than half the refractory period of a true neuron. The
                        number of matches of unit{" "}
                        <MathJax.Node inline formula={`k`} /> to the ground
                        truth is: <MathJax.Node inline formula={groundtruth} />
                      </p>
                      <p>
                        Note that if more than one sorted event falls within{" "}
                        <MathJax.Node inline formula={`\\pm \\Delta t`} /> of a
                        true event, only one is matched. The converse cannot
                        happen, by assumption.
                      </p>
                      <p>
                        The number of missed events is{" "}
                        <MathJax.Node
                          inline
                          formula={`n_box{miss}^k := n_GT
                        - n_box{match}^k.`}
                        />
                        .
                      </p>
                      <p>
                        The number of false positive events is{" "}
                        <MathJax.Node
                          inline
                          formula={`n_box{fp}^k := n_k - n_box{match}^k`}
                        />
                        .
                      </p>
                      <p>
                        To translate to the notation of Jun et al 2017,{" "}
                        <MathJax.Node
                          inline
                          formula={`n_1 = n_box{miss}^k$, $n_2 = n_box{match}^k$, $n_3
                        = n_box{fp}^k`}
                        />
                        .
                      </p>
                      <p>
                        For code implementation, this matching of sorted events
                        to ground-truth events uses{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://github.com/flatironinstitute/spikeforest/blob/dev/repos/spiketoolkit/spiketoolkit/comparison/sortingcomparison.py"
                        >
                          a routine from spiketoolkit
                        </a>
                        .
                      </p>
                      <p>
                        The default{" "}
                        <MathJax.Node inline formula={`\\Delta t`} />
                        is set as <code>delta_tp</code> there, in sample units
                        (note: the actual time thus depends on the sample rate).
                      </p>
                    </MathJax.Provider>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="container__sorter--row">
            <Col lg={12} sm={12}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Accuracy Metrics</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <MathJax.Provider>
                      <p>
                        For a given ground truth unit, and sorted unit{" "}
                        <MathJax.Node inline formula={`k`} />, the metrics are
                        as follows, in terms of the above counts:
                      </p>
                      <p>
                        <strong>Precision</strong>
                        <MathJax.Node
                          inline
                          formula={
                            "p^k := \frac{n_mbox{match}^k}{n_mbox{match}^k+n_mbox{fp}^k} = \frac{n_mbox{match}^k}{n^k} = \frac{n_2}{n_2+n_3}"
                          }
                        />
                      </p>
                      <p>Note: precision = 1 - false positive rate.</p>
                      <p>
                        <strong>Recall</strong>
                        <MathJax.Node
                          inline
                          formula={
                            "r_k := \frac{n_mbox{match}^k}{n_mbox{miss}^k+n_mbox{match}^k} = \frac{n_mbox{match}^k}{n_{GT}} = \frac{n_2}{n_1+n_2}"
                          }
                        />
                      </p>
                      <p>Note: recall = 1 - false negative rate.</p>
                      <p>
                        <strong>Accuracy</strong>
                        <MathJax.Node
                          inline
                          formula={
                            " $a_k := \frac{n_mbox{match}^k}{n_mbox{miss}^k+n_mbox{match}^k+n_mbox{fp}^k} = \frac{n_mbox{match}^k}{n^k + n_{GT}-n_mbox{match}} = \frac{n_2}{n_1+n_2+n_3}$"
                          }
                        />
                      </p>
                      <p>
                        Accuracy balances precision and recall. It is similar,
                        but not identical, to the clustering metric called the{" "}
                        <MathJax.Node inline formula={"F_1"} /> score.
                      </p>
                      <p>
                        <strong>Code</strong> see GenSortingComparisonTable in
                        compare_with_truth.py
                      </p>
                    </MathJax.Provider>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="container__sorter--row">
            <Col lg={12} sm={12}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Best Matching Unit</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <MathJax.Provider>
                      <p>
                        For each ground truth unit, the best matching unit{" "}
                        <MathJax.Node inline formula={"k"} /> to the ground
                        truth firing time list{" "}
                        <MathJax.Node inline formula={"s_i"} /> is the one with
                        the highest accuracy{" "}
                        <MathJax.Node inline formula={"a_k"} />, as defined
                        above. Only results for this unit are reported.
                      </p>
                    </MathJax.Provider>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="container__sorter--row">
            <Col lg={12} sm={12}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Other Metrics of a Unit</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <MathJax.Provider>
                      <p>
                        SNR (signal-to-noise ratio) is a property of a single
                        neural unit, either a ground truth unit or a unit as
                        output by a sorter. To compute it, the filtered
                        recording <MathJax.Node inline formula={"y_m(t)"} />{" "}
                        where{" "}
                        <MathJax.Node inline formula={"m = 1, \\dots,M"} /> is
                        the channel index and{" "}
                        <MathJax.Node inline formula={"t"} /> the time point, is
                        needed, and the list of firing times
                      </p>
                      <p style={divStyle}>
                        [say something about standardized filtering]
                      </p>
                      <p>
                        Firstly the mean waveforms{" "}
                        <MathJax.Node inline formula={"w_m^k(t)"} /> are
                        extracted for each unit label{" "}
                        <MathJax.Node inline formula={"k"} /> . Here the time
                        index is in the sample range{" "}
                        <MathJax.Node inline formula={"1le t le T"} />.
                      </p>
                      <p>
                        Then,{" "}
                        <MathJax.Node
                          inline
                          formula={
                            "\\mbox{SNR} := \frac{max_{m=1,dots,M, , t=1,dots,T} |w_m^k(t)|}{sigma_m}"
                          }
                        />{" "}
                        where a robust estimate of the (Gaussian-standardized)
                        standard deviation for the{" "}
                        <MathJax.Node inline formula={"m th"} /> channel is,{" "}
                        <MathJax.Node
                          inline
                          formula={"sigma_m = \frac{mbox{MAD}_m}{0.6745}"}
                        />
                        , where, for each channel{" "}
                        <MathJax.Node inline formula={"m"} /> , the median
                        absolute deviation of the filtered data is defined by{" "}
                        <MathJax.Node
                          inline
                          formula={`\\mbox{MAD} m = mbox{median}{(y_m(t) - overline{y_m})`}
                        />
                        where{" "}
                        <MathJax.Node
                          inline
                          formula={
                            "overline{y_m} := \frac{1}{T} sum_{(t = 1)}^T y_m(t)"
                          }
                        />{" "}
                        is the channel average.
                      </p>
                      <p>
                        The above are estimated by stochastic sampling in large
                        datasets.{" "}
                      </p>
                      <p>
                        {" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://github.com/flatironinstitute/spikeforest"
                        >
                          See here
                        </a>{" "}
                        for the scaling factor of the{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://en.wikipedia.org/wiki/Median_absolute_deviation"
                        >
                          MAD.
                        </a>{" "}
                      </p>
                      <p>
                        Find the code we use for computing SNR in{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://github.com/flatironinstitute/spikeforest"
                        >
                          compute_units_info.py
                        </a>
                      </p>
                    </MathJax.Provider>
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
export default Metrics;
