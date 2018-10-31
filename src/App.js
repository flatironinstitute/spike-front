import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App container container--lg">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>SpikeForest</h1>
          <p>
            Benchmarking of spike sorting algorithms. Seeing the spike forest
            for the trees.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut
            maximus eros. Aliquam pretium pretium tincidunt. Nam ornare leo a
            tincidunt facilisis. Nullam rutrum sagittis odio, at pulvinar sapien
            elementum et.
          </p>
          <a
            className="App-link"
            href="https://www.simonsfoundation.org/flatiron/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </header>
      </div>
    );
  }
}

export default App;
