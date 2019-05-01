import React, { Component } from "react";
import RepoIcon from "../AlgosBits/RepoIcon";
import DocsIcon from "../AlgosBits/DocsIcon";
import ActiveIcon from "../AlgosBits/ActiveIcon";
import algoRows from "../AlgosBits/algos-copy";
import ReactCollapsingTable from "react-collapsing-table";
import Preloader from "../Preloader/Preloader";
import { isEmpty } from "../../utils";
import { Card, Col, Container, Row } from "react-bootstrap";

class Sorters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    if (this.props.sorters && this.props.sorters.length) {
      this.filterActives();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.sorters !== prevProps.sorters) {
      this.filterActives();
    }
  }

  filterActives() {
    let rows = algoRows.map(algo => {
      let activeSorters = this.props.sorters.filter(
        sorter => sorter.processor_name === algo.name
      );
      algo.isActive = activeSorters.length ? true : false;
      return algo;
    });
    rows.sort((a, b) => {
      let textA = a.name.toUpperCase();
      let textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    rows.sort((a, b) => {
      return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
    });
    this.setState({ rows: rows });
  }

  render() {
    const algosColumns = [
      {
        accessor: "name",
        label: "Name",
        priorityLevel: 1,
        position: 1,
        minWidth: 100,
        sortable: true
      },
      {
        accessor: "isActive",
        label: "Present",
        priorityLevel: 2,
        position: 2,
        minWidth: 100,
        CustomComponent: ActiveIcon
      },
      {
        accessor: "latest",
        label: "Latest",
        priorityLevel: 2,
        position: 2,
        minWidth: 100
      },
      {
        accessor: "authors",
        label: "Authors",
        priorityLevel: 3,
        position: 3,
        minWidth: 150
      },
      {
        accessor: "repoUrl",
        label: "Repo",
        priorityLevel: 4,
        position: 4,
        minWidth: 100,
        CustomComponent: RepoIcon
      },
      {
        accessor: "docsUrl",
        label: "Docs",
        priorityLevel: 4,
        position: 4,
        minWidth: 100,
        CustomComponent: DocsIcon
      }
    ];
    let loading = isEmpty(this.props.sorters) || isEmpty(this.props.recordings);
    return (
      <div>
        <div className="page__body">
          {loading ? (
            <Container className="container__heatmap">
              <Card>
                <Card.Body>
                  <Preloader />
                </Card.Body>
              </Card>
            </Container>
          ) : (
              <Container className="container__heatmap">
                <Row className="container__sorter--row">
                  <Col lg={12} sm={12}>
                    <div className="card card--stats">
                      <div className="content">
                        <div className="card__label">
                          <p>
                            Sorters:{" "}
                            <strong>
                              Spike sorting algorithms tested in this project
                          </strong>
                          </p>
                        </div>
                        <div className="card__footer">
                          <hr />
                          <p>
                            {" "}
                            Generally speaking, spike sorting algorithms take in
                            an unfiltered multi-channel timeseries (aka,
                            recording) and a list of algorithm parameters and
                            output a list of firing times and associated integer
                            unit labels. This page lists the spike sorting codes
                            we run, as well as some that have yet to be
                            incorporated. Most of the codes were developed at
                            other institutions; two of them are in-house.
                        </p>
                          <p className="updated">Link to documentation?</p>
                          <p className="updated">
                            Embedded Notebooks / Scripts with Configs?
                        </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
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
              </Container>
            )}
        </div>
      </div>
    );
  }
}
export default Sorters;
