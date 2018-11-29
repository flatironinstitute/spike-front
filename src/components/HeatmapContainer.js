import React, { Component } from "react";
import Heatmap from "./Heatmap";
import { isEmpty } from "../utils";
import Preloader from "./Preloader";
import Legend from "./Legend";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { generateGradient } from "../dataHandlers";

class HeatmapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      builtData: [],
      accuracy: 0.8
    };
    this.margin = { top: 150, right: 0, bottom: 100, left: 326 };
    this.width = 440;
    this.height = 400 + this.margin.top + this.margin.bottom;
    this.colors = [];
    this.generateColors();
  }

  componentDidMount() {
    if (this.props.allUnits.length) {
      this.filterAccuracy();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.accuracy !== prevState.accuracy) {
      this.filterAccuracy();
    }
  }

  generateColors() {
    let colors = generateGradient("#ffffff", "#384ca2", 9);
    this.colors = colors;
  }

  filterAccuracy() {
    let filtered = this.props.results.map(result => {
      let above = result.accuracies.filter(accu => {
        return accu >= this.state.accuracy;
      });
      result.in_range = above.length;
      return result;
    });
    this.buildData(filtered).then(data => {
      this.setState({
        builtData: data
      });
    });
  }

  async buildData(filtered) {
    const builtData = await this.formatData(filtered);
    return builtData;
  }

  formatData(filtered) {
    return filtered.map(result => {
      return {
        study: result.study,
        in_range: result.in_range,
        sorter: result.sorter
      };
    });
  }

  handleAccuracyChange = value => {
    this.setState({
      accuracy: value
    });
  };

  render() {
    let loading = isEmpty(this.state.builtData);
    // TODO: Make grid size responsive.
    let gridSize = Math.floor(this.height / this.props.studies.length);
    let value = this.state.accuracy;
    return (
      <div>
        {loading ? (
          <Preloader />
        ) : (
          <div className="container container__heatmap--row">
            <div className="heatmap__legend col--2">
              <div className="slider__container">
                <h4 className="slider__title">Legend/Title?</h4>
                <div className="slider__vertical">
                  <Slider
                    min={0}
                    max={1}
                    value={value}
                    step={0.05}
                    orientation="vertical"
                    onChange={this.handleAccuracyChange}
                  />
                </div>
                <div className="slider__copy">
                  <p>Mimimum accuracy: {Math.round(value * 100) / 100}</p>
                </div>
              </div>
              <Legend
                gridSize={gridSize}
                colors={this.colors}
                builtData={this.state.builtData}
                width={this.width}
                height={this.height}
              />
            </div>
            <div className="heatmap__col col--7">
              <Heatmap
                colors={this.colors}
                builtData={this.state.builtData}
                sorters={this.props.sorters}
                studies={this.props.studies}
                gridSize={gridSize}
                margin={this.margin}
                width={this.width}
                height={this.height}
                allUnits={this.props.allUnits}
              />
            </div>
            {/* TODO: Refactor into a separate component */}
            <div className="unitdetail col--3">
              <h4 className="unitdetail__title">Detail View TK</h4>
              <div className="unitdetail__copy">
                <ul className="unitdetail__list">
                  <li>firing_rate: 2.33</li>
                  <li>in_range: 80</li>
                  <li>num_events: 1398</li>
                  <li>peak_channel: 0</li>
                  <li>recording: "001_synth"</li>
                  <li>snr: 25.396783859187707</li>
                  <li>sorter: "MountainSort4-thr3"</li>
                  <li>study: "magland_synth_noise10_K10_C4"</li>
                </ul>
                <p>
                  Boggarts lavender robes, Hermione Granger Fantastic Beasts and
                  Where to Find Them. Bee in your bonnet Hand of Glory elder
                  wand, spectacles House Cup Bertie Bott’s Every Flavor Beans
                  Impedimenta. Stunning spells tap-dancing spider Slytherin’s
                  Heir mewing kittens Remus Lupin. Palominos scarlet train black
                  robes, Metamorphimagus Niffler dead easy second bedroom. Padma
                  and Parvati Sorting Hat Minister of Magic blue turban remember
                  my last.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HeatmapContainer;
