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
    // TODO: Make this respoonsive
    this.margin = { top: 50, right: 0, bottom: 100, left: 226 };
    this.width = 1024;
    this.height = 830 + this.margin.top + this.margin.bottom;
  }

  componentDidMount() {
    this.buildData().then(data => {
      this.setState({
        builtData: data
      });
    });
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

  getGridSize() {
    Math.floor(this.width / this.props.sorters.length);
  }

  render() {
    let loading = isEmpty(this.state.builtData);
    let gridSize = Math.floor(this.width / this.props.sorters.length);
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
