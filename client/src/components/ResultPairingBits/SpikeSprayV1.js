import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Preloader from "../Preloader/Preloader";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries
} from "react-vis";

import { isEmpty } from "../../utils";

class SpikeSprayV1 extends Component {
  constructor(props) {
    super(props);
    this.state = { spikeCols: [] };
  }

  componentDidUpdate(prevProps) {
    console.log("didUpdate");
    if (this.props.recordingDetails !== prevProps.recordingDetails) {
      this.buildSprayData(this.props.recordingDetails);
    }
  }

  buildSprayData(recDetails) {
    const entries = Object.entries(recDetails);
    let spikeCols = [];
    for (const [key, spikeCol] of entries) {
      spikeCols.push(spikeCol);
    }
    let flatCols = [];
    spikeCols.forEach(spikes => {
      let lines = [];
      spikes.forEach(channels => {
        channels.forEach((timepoints, i) => {
          let colorArr = ["red", "yellow", "blue", "gray"];
          let colorLine = colorArr[i];
          lines.push({
            color: colorLine,
            data: timepoints
          });
        });
      });
      flatCols.push(lines);
    });
    this.setState({
      spikeCols: flatCols
    });
  }

  render() {
    console.log("😮", this.props.recordingDetails);
    let loading = isEmpty(this.state.spikeCols);
    let colorArr = ["red", "yellow", "blue", "gray"];
    console.log("📎", this.state.spikeCols);
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
          <Row>
            {this.state.spikeCols.map((lines, i) => (
              <Col lg={3} key={`spikecol-${Math.random(i)}`}>
                <XYPlot width={300} height={300}>
                  <HorizontalGridLines />
                  {lines.map((line, i) => (
                    <LineSeries
                      key={`line-${Math.random(i)}`}
                      color={line.color}
                      data={line.data}
                    />
                  ))}
                  <XAxis title={`Spikes-${i + 1}`} />
                  <YAxis />
                </XYPlot>
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  }
}

export default SpikeSprayV1;
