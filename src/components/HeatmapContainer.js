import React, { Component } from "react";
import HeatmapViz from "./HeatmapViz";
import { isEmpty } from "../utils";
import Preloader from "./Preloader";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

class HeatmapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      builtData: [],
      accuracy: 0.8
    };
  }

  componentDidMount() {
    if (this.props.unitsMap.length) {
      this.filterAccuracyMap();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.unitsMap !== prevProps.unitsMap ||
      this.state.accuracy !== prevState.accuracy
    ) {
      this.filterAccuracyMap();
    }
  }

  filterAccuracy(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      let above = sorter.accuracies.filter(accu => {
        return accu >= this.state.accuracy;
      });
      sorter.in_range = above.length;
      sorter.color = above.length;
      return sorter;
    });
    return newArr;
  }

  filterAccuracyMap() {
    let built = this.props.unitsMap.map(study => {
      let values = Object.values(study)[0];
      let key = Object.keys(study)[0];
      let filtered = this.filterAccuracy(values);
      return { [key]: filtered };
    });
    this.setState({ builtData: built });
  }

  handleAccuracyChange = value => {
    this.setState({
      accuracy: value
    });
  };

  render() {
    let loading = isEmpty(this.state.builtData);
    let accuracy = this.state.accuracy;
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
                    value={accuracy}
                    step={0.05}
                    orientation="vertical"
                    onChange={this.handleAccuracyChange}
                  />
                </div>
                <div className="slider__copy">
                  <p>Mimimum accuracy: {Math.round(accuracy * 100) / 100}</p>
                </div>
              </div>
            </div>
            <div className="heatmap__col col--7">
              <HeatmapViz filteredData={this.state.builtData} />
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
