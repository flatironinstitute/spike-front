import React from "react";
import { Link } from "react-router-dom";

import logo from "../Header/logo-no-icon.svg";
import waveforms from "./spike-waveforms.jpg";
import infographic from "../Pages/SpikeForest_Long.jpg";
import "./landing.css";

const Landing = () => (
  <div className="landing">
    <img src={logo} alt="SpikeForest" className="landing__logo" />
    <p className="landing__desc">
      Ground-truth validation of automated spike sorting algorithms.
    </p>
    <ul className="landing__links">
      <li>
        <a href="https://elifesciences.org/articles/55167">Paper</a>
        <span>Magland et al., eLife 2020</span>
      </li>
      <li>
        <a href="https://dandiarchive.org/dandiset/000618">Data</a>
        <span>DANDI:000618</span>
      </li>
      <li>
        <Link to="/heatmap">Original website</Link>
        <span>Results as of December 2019</span>
      </li>
    </ul>
    <figure className="landing__figure landing__figure--infographic">
      <a href={infographic}>
        <img
          src={infographic}
          alt="Infographic: Spike Sorting and Its Validation"
        />
      </a>
    </figure>
    <figure className="landing__figure">
      <img
        src={waveforms}
        alt="Spike waveforms on seven channels for ground truth, sorted, false negative, and false positive events"
      />
      <figcaption>
        Ground-truth and sorted waveforms for one unit on seven channels, with
        missed (false negative) and spurious (false positive) events shown
        separately.
      </figcaption>
    </figure>
  </div>
);

export default Landing;
