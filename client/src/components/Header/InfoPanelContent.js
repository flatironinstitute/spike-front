import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./infopanel.css";

class InfoPanel extends Component {
  render() {
    let className = this.props.sidebar ? "info info__inset" : "info";
    return (
      <div className={className}>
        <h5>About SpikeForest</h5>
        <p>
          Electrical recording from extracellular probes is a popular and
          affordable method to capture the simultaneous activity of many neurons
          in the brain or retina. There is a great need to quantify the
          reliability of the firing events extracted from the recordings by
          spike sorting algorithms. This website addresses this need, assessing
          many popular spike sorting codes via "ground truth" recordings, which
          are the gold standard in terms of accuracy.
        </p>
        <p>
          We host a variety of experimental paired ground truth recordings from
          the community and also many in silico synthetic recordings. Each
          sorter is run on all recordings and the resulting accuracies for the
          ground truth units are updated on a daily basis as needed. Approximate
          CPU/GPU run times are also reported.
        </p>
        <p>
          On the page below, browse all datasets, algorithms, sorting results,
          and comparisons, and inspect the source code used to generate these
          data. Use the links on the navbar to learn about{" "}
          <Link to="/recordings">recordings</Link>,{" "}
          <Link to="/sorters">sorters</Link>, and{" "}
          <Link to="/metrics">metric definitions</Link>. For more detailed
          information on this project, please consult the{" "}
          <Link to="/about">About</Link> page.
        </p>
        <p className="info__byline">
          Project of{" "}
          <a
            href="https://flatironinstitute.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Center for Computational Mathematics,
          </a>{" "}
          <a
            href="https://flatironinstitute.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flatiron Institute.
          </a>
        </p>
      </div>
    );
  }
}
export default InfoPanel;
