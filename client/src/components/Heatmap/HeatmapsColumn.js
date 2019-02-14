import React, { Component } from 'react';
import HeatmapCount from './HeatmapCount';
import HeatmapAverage from './HeatmapAverage';
import 'react-rangeslider/lib/index.css';
import {
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  Container,
} from 'react-bootstrap';

import './heatmap.css';

class HeatmapsColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: 'count',
    };
  }

  handleFormatChange = value => {
    this.setState({
      format: value,
    });
  };

  render() {
    let format = this.state.format;
    let copy =
      format === 'count'
        ? 'Number of groundtruth units above accuracy threshold'
        : 'Average accuracy of groundtruth units above SNR threshold';
    return (
      <div className="container__heatmaps">
        <Container>
          <p className="heatmap__big">Results Overview</p>
          <p className="heatmap__title">{copy}</p>
          <ButtonToolbar className="heatmap__buttonrow">
            <ToggleButtonGroup
              type="radio"
              name="options"
              size="lg"
              value={this.state.format}
              onChange={this.handleFormatChange}
            >
              <ToggleButton size="lg" value={'count'} variant="outline-dark">
                Number of Units Found
              </ToggleButton>
              <ToggleButton size="lg" value={'average'} variant="outline-dark">
                Average Accuracy Above a Threshhold
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
          <ButtonToolbar className="heatmap__buttonrow">
            <ToggleButtonGroup
              type="radio"
              name="options"
              size="lg"
              value={this.state.format}
              onChange={this.handleFormatChange}
            >
              <ToggleButton size="lg" value={'accuracy'} variant="outline-dark">
                Accuracy
              </ToggleButton>
              <ToggleButton
                size="lg"
                value={'precision'}
                variant="outline-dark"
              >
                Precision
              </ToggleButton>
              <ToggleButton size="lg" value={'recall'} variant="outline-dark">
                Recall
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </Container>
        {format === 'count' ? (
          <HeatmapCount {...this.props} format={this.state.format} />
        ) : (
          <HeatmapAverage {...this.props} format={this.state.format} />
        )}
      </div>
    );
  }
}

export default HeatmapsColumn;
