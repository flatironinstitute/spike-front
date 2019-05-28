import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Preloader from "../Preloader/Preloader";
// import { XYPlot, XAxis, LineSeries, LabelSeries } from "react-vis";
import Plot from 'react-plotly.js';
import { isEmpty } from "../../utils";
// import { width, height } from "window-size";

class SpikeSpray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spikeObjArr: [],
      hoveredNode: null,
      goRender: false
    };
    this.spacing = 0;
    this.numChannels = 0;
    this.numTimepoints = 0;
    this.colorArr = [
      "#e6194B",
      "#bfef45",
      "#3cb44b",
      "#42d4f4",
      "#4363d8",
      "#911eb4",
      "#f032e6",
      "#ffe119"
    ];
  }

  componentDidMount() {
    this.buildSprayData3();
  }

  componentDidUpdate(prevProps) {
    if (this.props.spikeSprayData !== prevProps.spikeSprayData) {
      this.buildSprayData3();
    }
  }

  // addOffset(timepoints, i) {
  //   let offset = -this.spacing * i;
  //   let newTPs = [];
  //   timepoints.forEach(timepoint => {
  //     let newtp = {
  //       x: timepoint.x,
  //       y: timepoint.y + offset
  //     };
  //     newTPs.push(newtp);
  //   });
  //   return newTPs;
  // }

  formatWaveformsAddOffset(waveforms, i) {
    let xyWaves = waveforms.map((wave, index) => {
      let timeVal = 1.67 * index;
      return { x: timeVal, y: wave };
    });
    return this.addOffset(xyWaves, i);
  }

  formatWaveforms(waveforms, i) {
    let xyWaves = waveforms.map((wave, index) => {
      let timeVal = 1.67 * index;
      return { x: timeVal, y: wave };
    });
    return xyWaves;
  }

  colorOrganizeColumns(columnArr) {
    let colorGroups = [];
    this.colorArr.forEach(color => {
      let colorGroup = columnArr.filter(line => line.color === color);
      if (colorGroup.length) {
        colorGroups.push(colorGroup);
      }
    });
    return colorGroups;
  }

  getXDataFromWaveform(waveform) {
    let ret = [];
    for (let i = 0; i < waveform.length; i++) {
      ret.push(i);
    }
    return ret;
  }

  getYDataFromWaveform(waveform, offset) {
    let ret = [];
    for (let i = 0; i < waveform.length; i++) {
      ret.push(waveform[i] + offset);
    }
    return ret;
  }

  buildSprayData3() {
    // determine spacing, numTimepoints, numChannels
    let vals = [];
    this.props.spikeSprayData.forEach(chartObj => {
      chartObj.spike_waveforms.forEach(spike => {
        this.numChannels = spike.channels.length;
        spike.channels.forEach((channel, i) => {
          this.numTimepoints = channel.waveform.length;
          channel.waveform.forEach(a => {
            vals.push(a + 0);
          })
        });
      });
    });
    // Custom sort is needed to deal with annoying case of scientific notation for very small values
    vals.sort(function (a, b) {
      if (Number(a) < Number(b)) return -1;
      else if (Number(b) < Number(a)) return 1;
      else return 0;
    });
    let pctl_low = vals[Math.floor(vals.length * 0.01)];
    let pctl_high = vals[Math.floor(vals.length * 0.99)];
    // let pctl_low = vals[0];
    // let pctl_high = vals[vals.length - 1];
    this.spacing = pctl_high - pctl_low;
    let withPlots = this.props.spikeSprayData.map(chartObj => {
      let plotData = [];
      if (chartObj.spike_waveforms.length) {
        chartObj.spike_waveforms.forEach(spike => {
          spike.channels.forEach((channel, i) => {
            let colorLine = this.colorArr[i];
            plotData.push({
              color: colorLine,
              channel: channel.channel_id,
              // data: this.formatWaveformsAddOffset(channel.waveform, i),
              xdata: this.getXDataFromWaveform(channel.waveform),
              ydata: this.getYDataFromWaveform(channel.waveform, -i * this.spacing)
            });
          });
        });
      } else {
        plotData.push([]);
      }
      // use reverse so that the first channel ultimately gets rendered on top
      plotData.reverse();
      return { ...chartObj, plotData: plotData };
    });
    // let spikeObjArr = this.buildLabelData(withPlots);
    // this.setState({
    //   spikeObjArr: spikeObjArr
    // });
    let spikeObjArr = withPlots;
    this.setState({
      spikeObjArr: spikeObjArr
    });
  }

  // buildLabelData(spikeObjArr) {
  //   let withLabels = spikeObjArr.map(chartObj => {
  //     let labelData = [];
  //     chartObj.channel_ids.forEach((channel, i) => {
  //       let offset = -this.spacing * i;
  //       let labelObj = {
  //         x: 0,
  //         y: offset,
  //         label: "Channel " + channel,
  //         style: { fontSize: "14px", lineheight: "16px", fontWeight: "400" }
  //       };
  //       labelData.push(labelObj);
  //     });
  //     return { ...chartObj, labelData: labelData };
  //   });
  //   return withLabels;
  // }

  render() {
    if (!this.state.goRender) {
      let that=this;
      setTimeout(function() {
        that.setState({goRender: true});
      },10);
      return <div>Rendering...</div>;
    }
    let loading = isEmpty(this.state.spikeObjArr);
    let totalTrue = this.props.numMatches + this.props.numFalseNegatives;
    let totalSorted = this.props.numMatches + this.props.numFalsePositives;
    let colTitles = {
      true: "Ground truth",
      sorted: "Sorted",
      true_missed: "False negatives",
      sorted_false: "False positives"
    };
    let colTotals = {
      true: totalTrue,
      sorted: totalSorted,
      true_missed: this.props.numFalseNegatives,
      sorted_false: this.props.numFalsePositives
    };
    // let totalSpikes = isEmpty(this.state.spikeObjArr)
    //   ? 0
    //   : this.state.spikeObjArr[0].num_spikes;

    return (
      <Container fluid={true}>
        {loading ? (
          <Container className="container__heatmap">
            <Card>
              <Card.Body>
                <Preloader />
              </Card.Body>
            </Card>
          </Container>
        ) : (
            <Row style={{ marginLeft: 0, marginRight: 0 }}>
              {this.state.spikeObjArr.map((column, i) => (
                <Col lg={3} key={`spikecol-${Math.random(i)}`} style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <div className="card__label">
                    <p className="card__charttitle">
                      {colTitles[column.name]}
                    </p>
                  </div>
                  <Plot style={{ width: '100%', height: '400px' }}
                    data={(
                      column.plotData.map((line, i) => (
                        {
                          x: line.xdata,
                          y: line.ydata,
                          type: 'scatter',
                          mode: 'lines',
                          line: {
                            width: 0.5,
                            color: line.color
                          },
                          hoverinfo: 'skip'
                        }
                      ))
                    )}
                    layout={(
                      {
                        // width: '100%',
                        // height: '100%',
                        title: '',
                        showlegend: false,
                        xaxis: {
                          autorange: false,
                          range: [0, this.numTimepoints - 1],
                          showgrid: false,
                          zeroline: false,
                          showline: false,
                          ticks: '',
                          showticklabels: false
                        },
                        yaxis: {
                          autorange: false,
                          range: [-this.numChannels * this.spacing, this.spacing],
                          showgrid: false,
                          zeroline: false,
                          showline: false,
                          ticks: '',
                          showticklabels: false
                        },
                        margin: {
                          l: 20, r: 20, b: 0, t: 0
                        }
                      }
                    )}
                    config={(
                      {
                        displayModeBar: false,
                        responsive: true
                      }
                    )}
                  />
                  <div className="card__label" style={{ fontSize: '14px', textAlign: 'center' }}>
                    <span>{column.num_spikes} of {colTotals[column.name]} spikes shown</span>
                  </div>
                </Col>
              ))}
            </Row>
          )}
      </Container>
    );
  }
}

export default SpikeSpray;
