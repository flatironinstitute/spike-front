import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import { XYPlot, XAxis, YAxis, HeatmapSeries, LabelSeries } from "react-vis";
import Preloader from "../Preloader/Preloader";
import { isEmpty } from "../../utils";

class SinglePairingRow extends Component {
  constructor(props) {
    super(props);
    this.state = { hoveredNode: null, data: null };
    this.dims = {
      height: 50,
      width: 700
    };
    this.margin = { left: 190, right: 80, top: 5, bottom: 5 };
    if (this.props.index === 0) {
      this.dims.height = 110;
      this.margin.top = 65;
    }
  }

  componentDidMount() {
    if (this.props.vizDatum) {
      this.setData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSorter !== prevProps.selectedSorter) {
      this.setData();
    }
  }

  setData() {
    //   TODO: Fix color map
    let colorMap = this.props.vizDatum.map(datum => datum.color);
    colorMap.sort((a, b) => a - b);
    let withColor = this.props.vizDatum.map(datum => {
      datum.style = colorMap.indexOf(datum.color) > 2 ? { fill: "white" } : {};
      if (
        this.props.selectedSorter &&
        this.props.selectedSorter === datum.sorter
      ) {
        datum.style = { fill: "#F6782D" };
      }
      return datum;
    });
    this.setState({
      data: withColor
    });
  }

  render() {
    // TODO: Add Selected Study Highlighting?
    // TODO: What is the best default for this?
    const { data } = this.state;
    const loading = isEmpty(data);
    const colorRange = {
      count: ["#fff", "#384ca2"],
      cpu: ["#fff", "#6238a2"],
      average: ["#fff", "#38a28f"]
    };
    return (
      <div>
        {loading ? (
          <Preloader />
        ) : (
          <div className="App heatmap-row">
            <XYPlot
              xType="ordinal"
              yType="ordinal"
              onMouseLeave={() => this.setState({ hoveredNode: null })}
              height={this.dims.height}
              width={this.dims.width}
              margin={this.margin}
            >
              {this.props.index === 0 ? (
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
                    fontSize: "11px"
                  }
                }}
              />
              {/* TODO: I think I need a smarter way to handle this information*/}
              <HeatmapSeries
                colorRange={colorRange[this.props.format]}
                data={data}
                style={{
                  text: {
                    stroke: "none",
                    fill: "#222",
                    fontWeight: 600,
                    fontSize: "14px"
                  }
                }}
                onValueMouseOver={d => {
                  this.setState({ hoveredNode: d });
                }}
                onValueClick={d => {
                  this.props.handleSorterChange(d);
                }}
              />
              <LabelSeries
                data={data}
                labelAnchorX="middle"
                labelAnchorY="central"
                onValueClick={d => {
                  this.props.handleSorterChange(d);
                }}
                getLabel={d => {
                  return d.in_range > 0 ? `${d.in_range}` : "";
                }}
              />
            </XYPlot>
          </div>
        )}
      </div>
    );
  }
}

export default SinglePairingRow;
