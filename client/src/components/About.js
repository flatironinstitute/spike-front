import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="container container--body">
        <div className="header">
          <h2 className="header__title">About</h2>
          <div className="header__copy">
            <p>
              <span class="header__copy--em">SpikeForest</span> is a website and
              open source computing framework for evaluating and comparing spike
              sorting algorithms for neurophysiology data analysis.
            </p>
            <p>
              The system includes a collection of standard electrophysiology
              datasets together with ground truth information and a collection
              of spike sorting algorithms. Each algorithm is run against all
              datasets, and the results are updated on a daily basis as needed.
              You can browse all datasets, algorithms, sorting results, and
              comparisons, and inspect the source code used to generate these
              data.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default About;
