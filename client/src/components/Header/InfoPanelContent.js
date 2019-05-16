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
          {/* #barcode:29426aa5-spikeforest-overview */}
          Extracellular electrical recording is a popular and affordable method to measure the simultaneous spiking activity of a large neural population.
          The key computational extraction of distinct neuronal units and firing times is known as spike sorting.
          However, there is a growing number of automated spike sorting codes, and much uncertainty and folklore about their accuracy
          in various experimental conditions. Several papers report comparisons on a case-by-case basis, but there is a lack of standardized
          measures and validation data. Furthermore, there is a potential for bias, such as sub-optimal tuning of competing algorithms, and a focus on one
          brain region or probe type. Without a fair and transparent comparison, genuine progress in the field remains difficult.
        </p>
        <p>
          Aiming to address this need, SpikeForest is a reproducible, continuously updating platform which benchmarks the performance of spike sorting
          codes across a large curated database of electrophysiological recordings with ground truth. It consists of this website
          for presenting our up-to-date findings, a <a href={'https://github.com/flatironinstitute/spikeforest'}>python package</a> which contains the tools for running the
          SpikeForest analysis, and an expanding collection of electrophysiology recordings with ground-truth spiking information.
        </p>
        <p>
          We host a variety of experimental paired ground truth recordings from
          the community and also many in silico synthetic recordings. Each
          sorter is run on all recordings and the resulting accuracies for the
          ground truth units are updated on a daily basis as needed. Approximate
          CPU/GPU run times are also reported.
        </p>
        <p>
          Visitors may browse all datasets, algorithms, sorting results,
          and comparisons, and inspect the source code used to generate these
                      data. Use the links on the navbar to learn about{" "}
          <Link to="/recordings">recordings</Link>,{" "}
          <Link to="/algorithms">algorithms</Link>, and{" "}
          <Link to="/metrics">metric definitions</Link>.
        </p>
        <p>
          <Link to="/about">Read more on the About page ...</Link>.
        </p>
        <p className="info__byline">
          Project of{" "}
          <a
            href="https://www.simonsfoundation.org/flatiron/center-for-computational-mathematics/"
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
