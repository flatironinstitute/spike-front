import React, { Component } from "react";

class RecordingRow extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  render() {
    const recording = this.props.value;
    return (
      <React.Fragment>
        <tr>
          <td />
          <td>{recording.name}</td>
          <td>{recording.description}</td>
          <td>{recording.numChannels}</td>
          <td>{recording.numTrueUnits}</td>
          <td>sample rate in hz</td>
          <td>{recording.spikeSign}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default RecordingRow;
