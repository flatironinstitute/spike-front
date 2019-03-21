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
    if (this.props.recordingDetails !== prevProps.recordingDetails) {
      this.buildSprayData(this.props.recordingDetails);
    }
  }

  groupBy(arr, property) {
    return arr.reduce(function(memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

  getMinY(data) {
    return data.reduce((min, p) => (p.y < min ? p.y : min), data[0].y);
  }

  getMaxY(data) {
    return data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y);
  }

  // TODO: Refactor so these are consolidated
  getMinMinY(data) {
    return data.reduce((min, p) => (p.minY < min ? p.minY : min), data[0].minY);
  }

  getMaxMaxY(data) {
    return data.reduce((max, p) => (p.maxY > max ? p.maxY : max), data[0].maxY);
  }

  buildSprayData(recDetails) {
    const entries = Object.entries(recDetails);
    let spikeCols = [];
    for (const [key, spikeCol] of entries) {
      console.log("Spray being made", key);
      spikeCols.push(spikeCol);
    }
    let flatCols = [];
    spikeCols.forEach(spikes => {
      let lines = [];
      spikes.forEach(channels => {
        channels.forEach((timepoints, i) => {
          let colorArr = ["#cd3b54", "#59b953", "#ba4fb9", "gray"];
          let colorLine = colorArr[i];
          lines.push({
            color: colorLine,
            data: timepoints,
            maxY: this.getMaxY(timepoints),
            minY: this.getMinY(timepoints)
          });
        });
      });

      let colorArr = ["#cd3b54", "#59b953", "#ba4fb9", "gray"];
      let colorGroups = colorArr.map(color => {
        let colorGroup = lines.filter(line => line.color === color);
        let minminY = this.getMinMinY(colorGroup);
        let maxmaxY = this.getMaxMaxY(colorGroup);
        let accurateOffset = Math.abs(minminY - maxmaxY) / 2 + 20;

        return colorGroup;
      });
      flatCols.push(colorGroups);
    });

    this.setState({
      spikeCols: flatCols
    });
  }

  render() {
    let loading = isEmpty(this.state.spikeCols);
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
          <Row>
            {this.state.spikeCols.map((colorGroup, i) => (
              <Col lg={3} key={`spikecol-${Math.random(i)}`}>
                <div className="card__label">
                  <p>
                    <strong>{colTitles[i]}</strong>
                  </p>
                </div>
                {colorGroup.map((lines, i) => (
                  <XYPlot
                    width={300}
                    height={300}
                    key={`spikeplot-${Math.random(i)}`}
                  >
                    <HorizontalGridLines />
                    {lines.map((line, i) => (
                      <LineSeries
                        key={`line-${Math.random(i)}`}
                        color={line.color}
                        data={line.data}
                      />
                    ))}
                    <XAxis title={`Channel-${i + 1}`} />
                  </XYPlot>
                ))}
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  }
}

export default SpikeSprayV1;
