import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MathJax from "react-mathjax";
import Sidebar from "../Sidebar/Sidebar";

class Metrics extends Component {
  render() {
    const listItems = [
      { name: "Matching of firing events", value: "matching" },
      { name: "Accuracy metrics", value: "accuracy" },
      { name: "Best matching unit", value: "best" },
      { name: "Other per-unit metrics", value: "other" },
      { name: "Filtering", value: "filtering" },
      { name: "References", value: "references" }
    ];
    const groundtruth =
      "n_{{  \\rm match } }^k \\; := \\; \\{ i: |t_j^k-s_i| < \\Delta t  \\mbox{ for some }\\ j \\}";
    return (
      <Container className="container-sidebar">
        <Row noGutters>
          <Col xl={2} md={3} sm={12} className="sidebar">
            <Sidebar listItems={listItems} listTitle={"Metrics"} />
          </Col>
          <Col xl={10} md={9} sm={12} className="page__body">
            <Row className="subcontainer justify-content-md-center">
              <Col lg={12} sm={12} xl={12}>
                <div className="intro">
                  <p className="big">Metrics</p>
                </div>
              </Col>
            </Row>
            <div className="finder" id="matching" />
            <Row className="subcontainer justify-content-md-center">
              <Col lg={12} sm={12} xl={12}>
                <div className="card card__std">
                  <div className="content">
                    <div className="card__label">
                      <p>
                        <strong>Matching of firing events</strong>
                      </p>
                    </div>
                    <div className="card__footer">
                      <hr />
                      <MathJax.Provider>
                        <p>
                          We first describe how labeled firing events output by
                          a sorter are matched to a given list of ground truth
                          events, with firing times{" "}
                          <MathJax.Node inline formula={`s_i`} />, labeled by
                          the index{" "}
                          <MathJax.Node inline formula={"i=1,\\dots,n_{GT}"} />.
                          Consider the sorted unit labeled{" "}
                          <MathJax.Node inline formula={"k"} />. Let{"  "}
                          <MathJax.Node
                            inline
                            formula={"t_j^k, j=1,\\dots,n_k"}
                          />{" "}
                          be the set of firing times of this unit output by the
                          sorter. Let
                          {"  "}
                          <MathJax.Node inline formula={`\\Delta t`} /> be an
                          acceptable firing time error, which we assume is
                          shorter than half the refractory period of a true
                          neuron.
                        </p>{" "}
                        <p>
                          The number of matches of unit{" "}
                          <MathJax.Node inline formula={`k`} /> to the ground
                          truth is defined by
                          <MathJax.Node formula={groundtruth} />
                          Note that even if more than one sorted event falls
                          within{" "}
                          <MathJax.Node inline formula={`\\pm \\Delta t`} /> of
                          a true event, at most one is matched. The reverse
                          situation, where more than one ground truth event from
                          the same neuron could match to a given sorted event,
                          cannot happen, by our assumption about the refractory
                          period.
                        </p>
                        <p>
                          Given the above, the number of missed events is then{" "}
                          <MathJax.Node
                            formula={`n_{{  \\rm miss } }^k := n_{GT}
                        - n_{{ \\rm match } }^k.`}
                          />
                        </p>
                        <p>
                          The number of false positive events is{" "}
                          <MathJax.Node
                            formula={`n_{{  \\rm fp } }^k := n_k - n_{{  \\rm match } }^k`}
                          />
                        </p>
                        <div>
                          <p>
                            Translated to the notation of Jun et al, 2017 [1],
                            these three metrics are,
                          </p>
                          <MathJax.Node
                            formula={`n_1 = n_{{  \\rm miss } }^k,  \\qquad n_2 = n_{{  \\rm match } }^k,
                        \\qquad n_3
                        = n_{{  \\rm fp } }^k`}
                          />
                        </div>
                        <p>
                          In the code implementation, the above matching of
                          sorted events to ground truth events uses{" "}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/SpikeInterface/spiketoolkit/blob/master/spiketoolkit/comparison/sortingcomparison.pyhttps://github.com/flatironinstitute/spikeforest/blob/master/spikeforest/spikeforest_analysis/sortingcomparison.py"
                          >
                            the sortingcomparison.py routine from spiketoolkit
                          </a>
                          . In this routine, the default{" "}
                          <MathJax.Node inline formula={`\\Delta t \\`} />
                          is set as <code>delta_frames</code> in sample units.
                          Note that the time in milliseconds thus depends on the
                          sample rate. We use{" "}
                          <MathJax.Node inline formula="\Delta t" /> is 30
                          samples (frames), corresponding to 1.5 ms at 20 kHz,
                          or 1 ms at 30 kHz.
                        </p>
                      </MathJax.Provider>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="finder" id="accuracy" />
            <Row className="subcontainer justify-content-md-center">
              <Col lg={12} sm={12} xl={12}>
                <div className="card card__std">
                  <div className="content">
                    <div className="card__label">
                      <p>
                        <strong>Accuracy metrics</strong>
                      </p>
                    </div>
                    <div className="card__footer">
                      <hr />
                      <MathJax.Provider>
                        <p>
                          The main page of SpikeForest allows ground truth unit
                          counts to be filtered by one of three metrics:
                          precision, recall, and overall accuracy. For a given
                          ground truth unit, and sorted unit{" "}
                          <MathJax.Node inline formula={`k`} />, these metrics
                          are as follows, in terms of the above counts:
                        </p>
                        <p className="metrics__inline">
                          <span className="metrics__label">Precision:</span>
                          <MathJax.Node
                            formula={
                              "p_k := \\frac{n_{  \\rm match }^k}{n_{  \\rm match }^k + n_{  \\rm fp }^k} = \\frac{n_{  \\rm match }^k}{n^k} = \\frac{ \\rm n_2}{ \\rm n_2+n_3}"
                            }
                          />
                        </p>
                        <p>Note: precision = 1 - (false positive rate).</p>
                        <p className="metrics__inline">
                          <span className="metrics__label">Recall:</span>
                          <MathJax.Node
                            formula={
                              "r_k := \\frac{n_{  \\rm match }^k}{n_{  \\rm miss }^k+n_{  \\rm match }^k} = \\frac{n_{  \\rm match }^k}{n_{GT}} = \\frac{ \\rm n_2}{ \\rm n_1+n_2}"
                            }
                          />
                        </p>
                        <p>Note: recall = 1 - (false negative rate).</p>
                        <p className="metrics__inline">
                          <span className="metrics__label">Accuracy:</span>
                          <MathJax.Node
                            formula={
                              "a_k := \\frac{n_{  \\rm match }^k}{n_{  \\rm miss }^k+n_{  \\rm match }^k + n_{  \\rm fp }^k} = \\frac{n_{  \\rm match }^k}{n^k + n_{GT}-n_{  \\rm match }} = \\frac{ \\rm n_2}{ \\rm n_1+n_2+n_3}"
                            }
                          />
                        </p>
                        <p>
                          Note: accuracy balances precision and recall. It is
                          similar, but not identical, to the clustering metric
                          called the{" "}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://en.wikipedia.org/wiki/F1_score"
                          >
                            <MathJax.Node inline formula={"F_1"} /> score.
                          </a>
                        </p>
                        <p>
                          See the SortingComparison class in{" "}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/flatironinstitute/spikeforest2/blob/master/spikeforest2_utils/_sortingcomparison.py"
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
            <div className="finder" id="best" />
            <Row className="subcontainer justify-content-md-center">
              <Col lg={12} sm={12} xl={12}>
                <div className="card card__std">
                  <div className="content">
                    <div className="card__label">
                      <p>
                        <strong>Best matching unit</strong>
                      </p>
                    </div>
                    <div className="card__footer">
                      <hr />
                      <MathJax.Provider>
                        <p>
                          For each ground truth unit, the best matching unit{" "}
                          <MathJax.Node inline formula={"k"} /> to the ground
                          truth firing time list{" "}
                          <MathJax.Node inline formula={"s_i"} /> is defined as
                          the one with the highest accuracy{" "}
                          <MathJax.Node inline formula={"a_k"} />, as defined
                          above.
                        </p>
                      </MathJax.Provider>
                      <p>
                        Only results (accuracy, precision, recall) for this unit
                        are reported.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="finder" id="other" />
            <Row className="subcontainer justify-content-md-center">
              <Col lg={12} sm={12} xl={12}>
                <div className="card card__std">
                  <div className="content">
                    <div className="card__label">
                      <p>
                        <strong>Other per-unit metrics</strong>
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
                          <MathJax.Node inline formula={"t"} /> the time point,
                          is needed, and the list of firing times. See below for
                          a description of filtering.
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
                              "\\mbox{ SNR} _k := \\frac{\\mbox{ max }_{m=1,\\dots,\\ M, \\ t=1,\\dots,T}\\  |w_m^k(t)|}{\\sigma _m}"
                            }
                          />
                          {"   "}where a robust estimate of the
                          (Gaussian-standardized) standard deviation for the{" "}
                          <MathJax.Node inline formula={"m th"} /> channel is,{" "}
                          <MathJax.Node
                            formula={
                              "\\sigma_m = \\frac{{\\mbox{ MAD}}_m}{0.6745}"
                            }
                          />
                          where, for each channel{" "}
                          <MathJax.Node inline formula={"m"} /> , the median
                          absolute deviation of the filtered data is defined by{" "}
                          <MathJax.Node
                            formula={`{\\mbox{ MAD}}_m = \\mbox{ median }\\ |y_m(t) - \\overline{y_m}|`}
                          />
                          where{"  "}
                          <MathJax.Node
                            inline
                            formula={
                              "\\overline{y_m} := \\frac{1}{T} \\sum_{t = 1}^T y_m(t)"
                            }
                          />{" "}
                          is the average of that channel.
                        </p>
                        <p>
                          In large datasets, the above are estimated by
                          stochastic sampling.{" "}
                        </p>
                        <p>
                          {" "}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/flatironinstitute/spikeforest2"
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
                            href="https://github.com/flatironinstitute/spikeforest2"
                          >
                            compute_units_info.py
                          </a>
                          .
                        </p>
                      </MathJax.Provider>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="finder" id="filtering" />
            <Row className="subcontainer justify-content-md-center">
              <Col lg={12} sm={12} xl={12}>
                <div className="card card__std">
                  <div className="content">
                    <div className="card__label">
                      <p>
                        <strong>Filtering</strong>
                      </p>
                    </div>
                    <div className="card__footer">
                      <hr />
                      <p>
                        Filtering of recording signals is done throughout
                        SpikeForest using a bandpass filter from 300 to 6000 Hz.
                        This is implemented via convolution using FFTs, allowing
                        an arbitrary function of frequency to be used as a
                        filter. We use erf (the error function) to create smooth
                        roll-offs at the low and high ends of the band. The
                        widths of the low-end roll-off is 100 Hz and the
                        high-end roll-off 1000 Hz. The point of the smoothness
                        here is to create rapid decay in impulse response in the
                        time domain.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="finder" id="references" />
            <Row className="subcontainer-final justify-content-md-center">
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
                      [1] James Jaeyoon Jun, Catalin Mitelut, Chongxi Lai,
                      Sergey Gratiy, Costas Anastassiou and Timothy D Harris,{" "}
                      <i>
                        <a href="https://www.biorxiv.org/content/10.1101/101030v2">
                          Real-time spike sorting platform for high-density
                          extracellular probes with ground truth validation and
                          drift correction
                        </a>
                      </i>
                      , bioRxiv 101030 (2017), doi:{" "}
                      <a href="https://doi.org/10.1101/101030">
                        https://doi.org/10.1101/101030
                      </a>
                      .
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Metrics;
