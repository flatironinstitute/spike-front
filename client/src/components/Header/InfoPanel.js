import React, { Component } from "react";
import Menu from "react-burger-menu/lib/menus/slide";
import { Link } from "react-router-dom";

import "./infopanel.css";
import icon from "./infoicon.svg";

class InfoPanel extends Component {
  render() {
    return (
      <Menu width={this.props.width} customBurgerIcon={<img src={icon} />}>
        <div className="info__inset">
          <h5>SpikeForest</h5>
          <p>
            Electrical recording from extracellular probes is a popular and
            affordable method to capture the simultaneous activity of many
            neurons in the brain or retina. There is a great need to quantify
            the reliability of the firing events extracted from the recordings
            by spike sorting algorithms. This website addresses this need,
            assessing many popular spike sorting codes via "ground truth"
            recordings, which are the gold standard in terms of accuracy.
          </p>
          <p>
            We host a variety of experimental paired ground truth recordings
            from the community and also many in silico synthetic recordings.
            Each sorter is run on all recordings and the resulting accuracies
            for the ground truth units are updated on a daily basis as needed.
            Approximate CPU/GPU run times are also reported.
          </p>
          <p>
            On the page below, browse all datasets, algorithms, sorting results,
            and comparisons, and inspect the source code used to generate these
            data. Use the links on the navbar to learn about{" "}
            <Link to="/recordings">recordings</Link>,{" "}
            <Link to="/sorters">sorters</Link>, and{" "}
            <Link to="/metrics">metric definitions</Link>.
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
              Flatiron Institue.
            </a>
          </p>
        </div>
      </Menu>
    );
  }
}
export default InfoPanel;
