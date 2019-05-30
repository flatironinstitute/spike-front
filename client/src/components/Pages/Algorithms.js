import React, { Component } from "react";
// import RepoIcon from "./AlgosBits/RepoIcon";
// import DocsIcon from "./AlgosBits/DocsIcon";
// import ActiveIcon from "./AlgosBits/ActiveIcon";
// import algoRows from "./AlgosBits/algos-copy";
import ReactCollapsingTable from "react-collapsing-table";
// import Preloader from "../Preloader/Preloader";
import { isEmpty } from "../../utils";
import { Card, Col, Container, Row } from "react-bootstrap";

class Algorithms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    if (this.props.algorithms && this.props.algorithms.length) {
      this.filterActives();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.algorithms !== prevProps.algorithms) {
      this.filterActives();
    }
  }

  filterActives() {
    let rows = this.props.algorithms.map(alg => {
      let row = {
        raw_label: alg.label,
        label: alg.label,
        processor_name: alg.processor_name,
        authors: alg.authors,
        notes: alg.notes,
        environment: "",
        wrapper: "",
        markdown: ""
      };
      if (alg.dockerfile) {
        row.environment = `<a href="${alg.dockerfile}" target="_blank">${basename(
          alg.dockerfile
        )}</a>`;
      }
      else if (alg.environment) {
        row.environment = `<span>${alg.environment}</span>`;
      }
      if (alg.wrapper) {
        row.wrapper = `<a href="${alg.wrapper}" target="_blank">${basename(alg.wrapper)}</a>`;
      }
      if (alg.markdown_link) {
        row.markdown = `<a href="${alg.markdown_link}" target="_blank">${basename(
          alg.markdown_link
        )}</a>`;
      }
      if (alg.website) {
        row.label = `<a href="${alg.website}" target="_blank">${alg.label}</a>`;
      }

      return row;
    });
    rows.sort((a, b) => {
      if (a.wrapper && !b.wrapper) return -1;
      if (!a.wrapper && b.wrapper) return 1;
      let textA = a.raw_label.toUpperCase();
      let textB = b.raw_label.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    rows.sort((a, b) => {
      return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
    });
    rows.forEach(row => {
      row.isActive = true;
    });
    this.setState({ rows: rows });
  }

  render() {
    const algosColumns = [
      {
        accessor: "label",
        label: "Algorithm webpage",
        priorityLevel: 1,
        minWidth: 100,
        sortable: true
      },
      {
        accessor: "authors",
        label: "Authors",
        priorityLevel: 2,
        minWidth: 100
      },
      {
        accessor: "environment",
        label: "Environment",
        priorityLevel: 4,
        minWidth: 100
      },
      {
        accessor: "wrapper",
        label: "Wrapper",
        priorityLevel: 4,
        minWidth: 150
      },
      {
        accessor: "markdown",
        label: "Description",
        priorityLevel: 4,
        minWidth: 100
      },
      {
        accessor: "notes",
        label: "Notes",
        priorityLevel: 4,
        minWidth: 100
      }
    ];
    let loading = isEmpty(this.props.algorithms);
    return (
      <div>
        <div className="page__body">
          {loading ? (
            <Container className="container__heatmap">
              <Card>
                <Card.Body>Preloader</Card.Body>
              </Card>
            </Container>
          ) : (
            <Container className="container__heatmap">
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--stats">
                    <ReactCollapsingTable
                      columns={algosColumns}
                      rows={this.state.rows}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--stats">
                    <div className="content">
                      <div className="card__footer">
                        <hr />
                        <h3>Algorithms overview</h3>
                        <p>
                          {" "}
                          Generally speaking, a spike sorting algorithm takes in
                          an unfiltered multi-channel timeseries (aka,
                          recording) and a dictionary of algorithm parameters and
                          outputs a list of firing times and associated integer
                          unit labels. This page lists the spike sorting codes
                          we run, as well as some that have yet to be
                          incorporated. Most of the codes were developed at
                          other institutions; two of them are in-house.
                        </p>
                        <p>
                          {" "}
                          SpikeForest uses Python wrappers to implement the
                          algorithms. Links to those may be found in the
                          "Wrapper" links above. For the non-MATLAB sorters, we
                          use singularity containers (similar to docker
                          containers) in order to ensure a reproducible compute
                          environment. In those cases, links to the docker files
                          (environment presciptions) are provided. We almost always use the default parameters of the wrappers, but some
                          may be overriden in the <a href={'https://github.com/flatironinstitute/spikeforest/tree/master/working/main_analysis'} target={"_blank"}>analysis configuration files</a>.
                        </p>
                        <p>
                          Wrappers
                          were created in collaboration with the <a href={'https://github.com/SpikeInterface/'} target={"_blank"}>SpikeInterface</a>{" "}
                          project. The goal is to ultimately merge these with
                          the corresponding wrappers in SpikeInterface/SpikeToolkit.
                        </p>
                        <h3>How to run the SpikeForest analysis locally</h3>
                        <p>
                          We have prepared a <a href={"https://github.com/flatironinstitute/spikeforest/blob/master/docs/tutorials/spike_sorting_spikeforest_recording.md"} target={"_blank"}>tutorial</a>{" "}
                          illustrating how to run these algorithms on your own
                          computer to reproduce the results.
                        </p>
                        <h3>How to run spike sorting on your own data</h3>
                        <p>
                          We have also created <a href={"https://github.com/flatironinstitute/spikeforest/blob/master/docs/tutorials/spike_sorting_single_recording.md"} target={"_blank"}>this tutorial</a> which shows
                          how to run the SpikeForest-wrapped spike sorters on your own data.
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </div>
    );
  }
}

function basename(path) {
  return path.split("/").reverse()[0];
}

export default Algorithms;
