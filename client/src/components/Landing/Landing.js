import React from "react";
import { Link } from "react-router-dom";

import logo from "../Header/logo-no-icon.svg";
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
  </div>
);

export default Landing;
