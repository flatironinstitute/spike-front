import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MathJax from "react-mathjax";

import "./pages.css";

class Metrics extends Component {
  render() {
    // const tex = `f(x) = \\int_{-\\infty}^\\infty
    // \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    // \\,d\\xi`;

    const groundtruth =
      "n_{{ \\scriptsize match } }^k:=  i: |t_j^k-s_i| < \\Delta t  \\mbox{ for some }\\ j";
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
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
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
                          formula={"t_j^k \\ `for` \\ j=1,\\dots,n_k"}
                        />{" "}
                        be the firing times of this unit from the sorter. Let
                        {"  "}
                        <MathJax.Node inline formula={`\\Delta t`} /> be an
                        acceptable firing time error, which we assume is shorter
                        than half the refractory period of a true neuron.
                      </p>{" "}
                      <p>
                        The number of matches of unit{" "}
                        <MathJax.Node inline formula={`k`} /> to the ground
                        truth is:
                      </p>
                      <MathJax.Node formula={groundtruth} />
                      <p>
                        Note that if more than one sorted event falls within{" "}
                        <MathJax.Node inline formula={`\\pm \\Delta t`} /> of a
                        true event, only one is matched. The converse cannot
                        happen, by assumption.
                      </p>
                      <p>
                        The number of missed events is:{" "}
                        <MathJax.Node
                          formula={`n_{{ \\scriptsize miss } }^k := n_{GT}
                        - n_{{ \\scriptsize match } }^k.`}
                        />
                      </p>
                      <p>
                        The number of false positive events is:{" "}
                        <MathJax.Node
                          formula={`n_{{ \\scriptsize fp } }^k := n_k - n_{{ \\scriptsize match } }^k`}
                        />
                      </p>
                      <p style={divStyle}>
                        Confirm citation style and see bottom section. Are other
                        references needed on this page?
                      </p>
                      <p>
                        Translated to the notation of Jun et al, 2017[1] :
                        <MathJax.Node
                          formula={`n_1 = n_{{ \\scriptsize miss } }^k,  \\ n_2 = n_{{ \\scriptsize match } }^k,  \\ n_3
                        = n_{{ \\scriptsize fp } }^k`}
                        />
                      </p>
                      <p>
                        In the code implementation, this matching of sorted
                        events to ground-truth events uses{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://github.com/flatironinstitute/spikeforest/blob/master/spikeforest/spikeforest/spiketoolkit/comparison/sortingcomparison.py"
                        >
                          a routine from spiketoolkit
                        </a>
                        . In this routine, the default{" "}
                        <MathJax.Node inline formula={`\\Delta t \\`} />
                        is set as <code>delta_tp</code> in sample units. Note
                        that the actual time thus depends on the sample rate.
                      </p>
                    </MathJax.Provider>
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
                      <p className="metrics__inline">
                        <span className="metrics__label">Precision:</span>
                        <MathJax.Node
                          inline
                          formula={
                            "p^k := \\frac{n_{ \\scriptsize match }^k}{n_{ \\scriptsize match }^k + n_{ \\scriptsize fp }^k} = \\frac{n_{ \\scriptsize match }^k}{n^k} = \\frac{n_2}{n_2+n_3}"
                          }
                        />
                      </p>
                      <p>
                        <i>Precision = 1 - false positive rate.</i>
                      </p>
                      <p className="metrics__inline">
                        <span className="metrics__label">Recall:</span>
                        <MathJax.Node
                          inline
                          formula={
                            "r_k := \\frac{n_{ \\scriptsize match }^k}{n_{ \\scriptsize miss }^k+n_{ \\scriptsize match }^k} = \\frac{n_{ \\scriptsize match }^k}{n_{GT}} = \\frac{n_2}{n_1+n_2}"
                          }
                        />
                      </p>
                      <p>
                        <i>Recall = 1 - false negative rate.</i>
                      </p>
                      <p className="metrics__inline">
                        <span className="metrics__label">Accuracy:</span>
                        <MathJax.Node
                          inline
                          formula={
                            "a_k := \\frac{n_{ \\scriptsize match }^k}{n_{ \\scriptsize miss }^k+n_{ \\scriptsize match }^k + n_{ \\scriptsize fp }^k} = \\frac{n_{ \\scriptsize match }^k}{n^k + n_{GT}-n_{ \\scriptsize match }} = \\frac{n_2}{n_1+n_2+n_3}"
                          }
                        />
                      </p>
                      <p>
                        Accuracy balances precision and recall. It is similar,
                        but not identical, to the clustering metric called the{" "}
                        <MathJax.Node inline formula={"F_1"} /> score.
                      </p>
                      <p>
                        See the GenSortingComparisonTable class in{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://github.com/flatironinstitute/spikeforest/blob/master/spikeforest/spikeforest_analysis/compare_sortings_with_truth.py"
                        >
                          compare_sortings_with_truth.py
                        </a>{" "}
                        for code implementation.
                      </p>
                    </MathJax.Provider>
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
                        above.
                      </p>
                    </MathJax.Provider>
                    <p>Only results for this unit are reported.</p>
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
                        needed, and the list of firing times.
                      </p>
                      <p style={divStyle}>
                        [say something about standardized filtering]
                      </p>
                      <p>
                        Firstly, the mean waveforms{" "}
                        <MathJax.Node inline formula={"w_m^k(t)"} /> are
                        extracted for each unit label{" "}
                        <MathJax.Node inline formula={"k"} /> . Here the time
                        index is in the sample range{" "}
                        <MathJax.Node inline formula={"1 \\le t \\le T"} />.
                      </p>
                      <p>
                        Then,
                        <MathJax.Node
                          formula={
                            "{SNR}_k := \\frac{max_{m=1,\\dots,\\ M, \\ t=1,\\dots,T}  |w_m^k(t)|}{sigma_m}"
                          }
                        />
                        {"   "}where a robust estimate of the
                        (Gaussian-standardized) standard deviation for the{" "}
                        <MathJax.Node inline formula={"m th"} /> channel is,{" "}
                        <MathJax.Node
                          formula={"sigma_m = \\frac{{MAD}_m}{0.6745}"}
                        />
                        where, for each channel{" "}
                        <MathJax.Node inline formula={"m"} /> , the median
                        absolute deviation of the filtered data is defined by{" "}
                        <MathJax.Node
                          formula={`{MAD}_m = median(y_m(t) - \\overline{y_m})`}
                        />
                        where{"  "}
                        <MathJax.Node
                          inline
                          formula={
                            "\\overline{y_m} := \\frac{1}{T} \\sum_{(t = 1)}^T y_m(t)"
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
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>References</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    [1] James Jun, Someone Else and Another Person,
                    <i>The Name of this Article</i>, A Publication. (0) 00
                    (2017), no. 0, 0000–0000, DOI 10.0000.
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
