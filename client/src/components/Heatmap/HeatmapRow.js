import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HeatmapSeries,
  LabelSeries
} from "react-vis";
import Preloader from "../Preloader/Preloader";
import { isEmpty } from "../../utils";

class HeatmapRow extends Component {
  constructor(props) {
    super(props);
    this.state = { hoveredNode: null, data: null };
    this.dims = {
      height: 70,
      width: 620
    };
    this.data_fontsize = '14px';
    if (props.rowtype === 'small') {
      this.dims.height = 40;
      this.data_fontsize = '11px';
    }
    this.margin = { left: 190, right: 80, top: 5, bottom: 5 };
    if (this.props.showXLabels) {
      // make room for the labels above
      this.dims.height = this.dims.height + 60;
      this.margin.top = 65;
    }
    console.log(this.dims, props.rowtype);
  }

  componentDidMount() {
    if (this.props.cells) {
      this.setData();
    }
  }

  componentDidUpdate(prevProps) {
    if ((this.props.selectedCell !== prevProps.selectedCell) || (this.props.cells !== prevProps.cells )) {
      this.setData();
    }
  }

  setData() {
    let colorMap = this.props.cells.map(datum => datum.color);
    colorMap.sort((a, b) => a - b);
    let withColor = this.props.cells.map(datum => {
      datum.style = colorMap.indexOf(datum.color) > 2 ? { fill: "white" } : {};
      if (datum.selected) {
        datum.style = { fill: "#F6782D" };
      }
      return datum;
    });
    this.setState({
      data: withColor
    });
  }

  selectCell(datum) {
    if (this.props.onSelectCell) {
      this.props.onSelectCell(datum);
    }
  }

  selectLabel(datum) {
    if (this.props.onSelectLabel) {
      this.props.onSelectLabel(datum);
    }
  }

  render() {
    const { data } = this.state;
    const loading = isEmpty(data);
    // TODO: use the color range tool from the d3 test local repo to reset scales
    const colorRange = {
      count: ["#fff", "#384ca2"],
      cpu: ["#fff", "#6238a2"],
      average: ["#fff", "#15423A"]
    };
    return (
      <div>
        {loading ? (
          <Preloader />
        ) : (
            <div className="App heatmap-row">
              <FlexibleWidthXYPlot
                xType="ordinal"
                yType="ordinal"
                onMouseLeave={() => this.setState({ hoveredNode: null })}
                height={this.dims.height}
                xPadding={30}
                margin={this.margin}
              >
                {this.props.showXLabels === 0 ? (
                  <XAxis
                    orientation={"top"}
                    tickLabelAngle={-25}
                    position={"start"}
                    title="Count above accuracy threshold"
                    style={{
                      text: {
                        stroke: "none",
                        fill: "#222",
                        fontWeight: 600,
                        fontSize: "12px"
                      }
                    }}
                  />
                ) : null}
                <YAxis
                  style={{
                    text: {
                      stroke: "none",
                      fill: "#222",
                      fontWeight: 600,
                      fontSize: "14px"
                    }
                  }}
                />
                <HeatmapSeries
                  colorRange={colorRange[this.props.format]}
                  data={data}
                  style={{
                    text: {
                      stroke: "none",
                      fill: "#222",
                      fontWeight: 600,
                      fontSize: '14px'
                    }
                  }}
                  onValueMouseOver={d => {
                    this.setState({ hoveredNode: d });
                  }}
                  onValueClick={d => {
                    this.props.onSelectCell(d);
                  }}
                />
                <LabelSeries
                  data={data}
                  labelAnchorX="middle"
                  labelAnchorY="central"
                  onValueClick={d => {
                    this.props.onSelectLabel(d);
                  }}
                  getLabel={d => {
                    return d.text;
                  }}
                />
              </FlexibleWidthXYPlot>
            </div>
          )}
      </div>
    );
  }
}

export default HeatmapRow;
