import React, { Component } from "react";
import HeatmapRow from "./HeatmapRow";
import { isEmpty } from "../utils";
import { ContinuousColorLegend } from "react-vis";

class HeatmapViz extends Component {
  constructor(props) {
    super(props);
    this.state = { vizData: [] };
  }

  componentDidMount() {
    this.buildVizData(this.props.filteredData);
  }

  componentDidUpdate(prevProps) {
    if (this.props.builtData !== prevProps.builtData) {
      this.buildVizData(this.props.filteredData);
    }
  }

  buildVizData(data) {
    if (data) {
      let vizData = data.map(study => {
        let values = Object.values(study)[0];
        return values.sort((a, b) => {
          let textA = a.sorter.toUpperCase();
          let textB = b.sorter.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        // TODO: Allow for other sorting
      });
      let newViz = vizData.sort((a, b) => {
        let textA = a[0].study.toUpperCase();
        let textB = b[0].study.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      this.setState({ vizData: newViz });
    }
  }

  render() {
    const loading = isEmpty(this.state.vizData);
    return (
      <div>
        {loading ? (
          <h4>...</h4>
        ) : (
          <div className="heatmap__container">
            <div className="heatmap__legend">
              <ContinuousColorLegend
                width={600}
                startColor={"#fafafd"}
                endColor={"#384ca2"}
                startTitle="Least Units Found"
                endTitle="Most Units Found"
                height={20}
              />
            </div>
            {this.state.vizData.map((data, i) => (
              <HeatmapRow
                vizDatum={data}
                key={`hmrow${i}`}
                index={i}
                sorters={this.props.sorters.sort()}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default HeatmapViz;
