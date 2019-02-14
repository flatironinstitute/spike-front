import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './pages.css';

class Metrics extends Component {
  render() {
    return (
      <div className="home__body">
        <div className="intro">
          <p className="big">Metrics</p>
          <div className="dividerthick" />
          <p className="subhead">
            Definitions of accuracy and other metrics used throughout
            SpikeForest.
          </p>
          <p className="updated">Updated on February 14, 2019</p>
          <p className="updated-sub">
            Different accuracy metrics may be selected via the radio buttons on
            the results overview heatmap on the home page.
          </p>
          <p className="jump-container">
            <Link smooth to="/#overview" className="jump-link">
              View Results Overview
            </Link>
          </p>
        </div>
        <div className="opener">
          <div className="prose-container">
            <h3>Matching of firing events</h3>
            <p>[Add copy with MathML]</p>
            <h3>Accuracy metrics</h3>
            <p>[Add copy with MathML]</p>
            <h3>Best matching unit</h3>
            <p>[Add copy with MathML]</p>
            <h3>Other metrics of a unit</h3>
            <p>[Add copy with MathML]</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Metrics;
