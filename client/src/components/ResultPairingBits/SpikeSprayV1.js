import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Preloader from "../Preloader/Preloader";
import {
  Crosshair,
  XYPlot,
  XAxis,
  HorizontalGridLines,
  LineSeries
} from "react-vis";

import { isEmpty } from "../../utils";

class SpikeSprayV1 extends Component {
  constructor(props) {
    super(props);
    this.state = { splitSpikeCols: [], spikeCols: [], hoveredNode: null };
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

  addOffset(timepoints, i) {
    let offset = -200 * i;
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

  buildSprayData(recDetails) {
    const entries = Object.entries(recDetails);
    let spikeCols = [];
    for (const [key, spikeCol] of entries) {
      console.log("Spray being made", key);
      spikeCols.push(spikeCol);
    }
    let testCols = [];
    let splitCols = [];
    spikeCols.forEach(spikes => {
      let lines = [];
      spikes.forEach(channels => {
        channels.forEach((timepoints, i) => {
          let colorArr = ["#cd3b54", "#59b953", "#ba4fb9", "gray"];
          let colorLine = colorArr[i];
          lines.push({
            color: colorLine,
            data: this.addOffset(timepoints, i)
          });
        });
      });

      let colorArr = ["#cd3b54", "#59b953", "#ba4fb9", "gray"];
      let colorGroups = colorArr.map(color => {
        let colorGroup = lines.filter(line => line.color === color);
        return colorGroup;
      });
      splitCols.push(colorGroups);
      testCols.push(lines);
    });
    this.setState({
      splitSpikeCols: splitCols,
      spikeCols: testCols
    });
  }

  // getLineColor(data) {
  //   console.log("hoveredNide", this.state.hoveredNode);
  //   return this.state.hoveredNode === data ? "#f6cf3f" : "#807f84";
  // }

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
          <div>
            <Row>
              {this.state.spikeCols.map((column, i) => (
                <Col lg={3} key={`spikecol-${Math.random(i)}`}>
                  <div className="card__label">
                    <p>
                      <strong>{colTitles[i]}</strong>
                    </p>
                  </div>
                  <XYPlot
                    width={350}
                    height={350}
                    key={`spikeplot-${Math.random(i)}`}
                  >
                    <XAxis title="Time units here" />
                    <HorizontalGridLines />
                    {column.map((line, i) => (
                      <LineSeries
                        key={`line-${Math.random(i)}`}
                        color={
                          this.state.hoveredNode === line.data
                            ? "#f6cf3f"
                            : "#807f84"
                        }
                        data={line.data}
                        style={{ strokeWidth: 0.25 }}
                        onNearestXY={d => this.setState({ hoveredNode: d })}
                      />
                    ))}
                  </XYPlot>
                </Col>
              ))}
            </Row>
            <Row>
              {this.state.splitSpikeCols.map((colorGroup, i) => (
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
          </div>
        )}
      </div>
    );
  }
}

export default SpikeSprayV1;
