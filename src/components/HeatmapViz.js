import React, { Component } from "react";
import HeatmapRow from "./HeatmapRow";
import Preloader from "./Preloader";
import { isEmpty } from "../utils";

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
        return Object.values(study)[0];
      });
      this.setState({ vizData: vizData });
    }
  }

  render() {
    const loading = isEmpty(this.state.vizData);
    return (
      <div>
        {loading ? (
          <Preloader />
        ) : (
          <div className="App">
            {this.state.vizData.map((data, i) => (
              <HeatmapRow vizDatum={data} key={`hmrow${i}`} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default HeatmapViz;
