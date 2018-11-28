import React, { Component } from "react";
import Heatmap from "./Heatmap";
import { isEmpty } from "../utils";
import Preloader from "./Preloader";

class HeatmapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      builtData: []
    };
    // TODO: Make margin and overall height / width responsive
    this.margin = { top: 50, right: 0, bottom: 100, left: 226 };
    this.width = 440;
    this.height = 400 + this.margin.top + this.margin.bottom;
  }

  componentDidMount() {
    if (this.props.results.length) {
      this.buildData().then(data => {
        this.setState({
          builtData: data
        });
      });
    }
  }

  async buildData() {
    const builtData = await this.formatData();
    return builtData;
  }

  formatData() {
    return this.props.results.map(result => {
      return {
        study: result.study,
        in_range: result.in_range,
        sorter: result.sorter
      };
    });
  }

  render() {
    let loading = isEmpty(this.state.builtData);
    // TODO: Make grid size responsive.
    let gridSize = Math.floor(this.height / this.props.studies.length);
    return (
      <div>
        {loading ? (
          <Preloader />
        ) : (
          <Heatmap
            builtData={this.state.builtData}
            sorters={this.props.sorters}
            studies={this.props.studies}
            gridSize={gridSize}
            margin={this.margin}
            width={this.width}
            height={this.height}
          />
        )}
      </div>
    );
  }
}

export default HeatmapContainer;
