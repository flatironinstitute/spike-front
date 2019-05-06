import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Preloader from "../Preloader/Preloader";
import { XYPlot, XAxis, LineSeries, YAxis } from "react-vis";
import { isEmpty } from "../../utils";
const newRecDetails = require("./sampleNewRecordingDetails.js");

class SpikeSprayV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetSpikeCols: [],
      spikeCols: [],
      hoveredNode: null
    };
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
    this.buildSprayData();
    this.buildSprayData2();
  }

  addOffset(timepoints, i) {
    let offset = -0.2 * i;
    let newTPs = [];
    timepoints.forEach(timepoint => {
      let newtp = {
        x: timepoint.x,
        y: timepoint.y + offset
      };
      newTPs.push(newtp);
    });
    return newTPs;
  }

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

  buildSprayData2() {
    let spikeCols = newRecDetails.map(column => {
      let columnArr = [];
      if (column.spike_waveforms.length) {
        column.spike_waveforms.forEach(spike => {
          spike.channels.forEach((channel, i) => {
            let colorLine = this.colorArr[i];
            columnArr.push({
              color: colorLine,
              data: this.formatWaveformsAddOffset(channel.waveform, i)
            });
          });
        });
      } else {
        columnArr.push([]);
      }
      return columnArr;
    });
    this.setState({
      offsetSpikeCols: spikeCols
    });
  }

  buildSprayData() {
    let spikeCols = newRecDetails.map(column => {
      let columnArr = [];
      if (column.spike_waveforms.length) {
        column.spike_waveforms.forEach(spike => {
          spike.channels.forEach((channel, i) => {
            let colorLine = this.colorArr[i];
            columnArr.push({
              color: colorLine,
              data: this.formatWaveforms(channel.waveform, i)
            });
          });
        });
      } else {
        columnArr.push([]);
      }
      return columnArr;
    });
    this.setState({
      spikeCols: spikeCols
    });
  }

  render() {
    let loading =
      isEmpty(this.state.spikeCols) && isEmpty(this.state.offsetSpikeCols);
    let colTitles = [
      "Groundtruth",
      "Sorting",
      "False Positive",
      "False Negative"
    ];
    return (
      <div>
        {loading ? (
          <Container className="container__heatmap">
            <Card>
              <Card.Body>
                <Preloader />
              </Card.Body>
            </Card>
          </Container>
        ) : (
          <div>
            <Row>
              {this.state.offsetSpikeCols.map((column, i) => (
                <Col lg={3} key={`spikecol-${Math.random(i)}`}>
                  <div className="card__label">
                    <p className="card__charttitle">
                      {colTitles[i]} <br />x of y spikes shown
                    </p>
                  </div>
                  <XYPlot
                    width={350}
                    height={700}
                    key={`spikeplot-${Math.random(i)}`}
                  >
                    <XAxis title="Samples" />
                    {column.map((line, i) => (
                      <LineSeries
                        key={`line-${Math.random(i)}`}
                        color={line.color}
                        data={line.data}
                        style={{ strokeWidth: 0.25 }}
                      />
                    ))}
                  </XYPlot>
                </Col>
              ))}
            </Row>
            <Row>
              {this.state.spikeCols.map((column, i) => (
                <Col lg={3} key={`spikecol-${Math.random(i)}`}>
                  <div className="card__label">
                    <p className="card__charttitle">
                      {colTitles[i]} x of y spikes shown
                    </p>
                  </div>
                  <XYPlot
                    width={350}
                    height={350}
                    key={`spikeplot-${Math.random(i)}`}
                  >
                    <XAxis title="Samples" />
                    <YAxis title="Y TITLE?" />
                    {column.map((line, i) => (
                      <LineSeries
                        key={`line-${Math.random(i)}`}
                        color={line.color}
                        data={line.data}
                        style={{ strokeWidth: 0.25 }}
                        onNearestXY={d => this.setState({ hoveredNode: d })}
                      />
                    ))}
                  </XYPlot>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    );
  }
}

export default SpikeSprayV2;
