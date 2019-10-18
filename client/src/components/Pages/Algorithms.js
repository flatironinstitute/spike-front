import React, { Component } from "react";
import { isEmpty, toTitleCase } from "../../utils";
import { removeMd } from "remove-markdown";
import { Card, Col, Container, Row } from "react-bootstrap";
import ListCard from "../ListCard/ListCard";
import Preloader from "../Preloader/Preloader";
import Sidebar from "../Sidebar/Sidebar";

class Algorithms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
    this.handleClick = this.basename.bind(this);
  }

  componentDidMount() {
    if (this.props.algorithms && this.props.algorithms.length) {
      this.filterActives();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.algorithms !== prevProps.algorithms) {
      this.filterActives();
    }
  }

  basename(path) {
    return path.split("/").reverse()[0];
  }

  parseDescription(markdown) {
    let par1 = markdown.split("Description")[1];
    let useable = par1.split("## References")[0];
    // TODO: Replace with expandable cell and markdown
    const plainText = removeMd(useable);
    return plainText;
  }

  sortRows(rows) {
    let sorted = rows.sort((a, b) => {
      if (a.wrapper && !b.wrapper) return -1;
      if (!a.wrapper && b.wrapper) return 1;
      let textA = a.raw_label.toUpperCase();
      let textB = b.raw_label.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    return sorted;
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
        markdown: "",
        markdown_link: "",
        website: "/",
        wrapper_link: "/",
        env_name: "tbd",
        env_link: "/"
      };
      if (alg.dockerfile) {
        row.environment = `<a href="${
          alg.dockerfile
        }" target="_blank">${this.basename(alg.dockerfile)}</a>`;
        // keep
        row.env_name = "Docker";
        row.env_link = alg.dockerfile;
      } else if (alg.environment) {
        row.environment = `<span>${alg.environment}</span>`;
        // keep
        row.env_name = alg.environment;
      }
      if (alg.wrapper) {
        row.wrapper = `<a href="${alg.wrapper}" target="_blank">${this.basename(
          alg.wrapper
        )}</a>`;
        // keep
        let nextTo = alg.wrapper.split("/")[9];
        let last = alg.wrapper.split("/")[10];
        let wrapper = `https://github.com/flatironinstitute/spikeforest/blob/master/spikeforest/spikeforestsorters/${nextTo}/${last}`;
        row.wrapper_link = wrapper;
      }
      if (alg.markdown_link) {
        row.markdown_link = `<a href="${
          alg.markdown_link
        }" target="_blank">${this.basename(alg.markdown_link)}</a>`;
      }
      if (alg.markdown) {
        // keep
        row.markdown = this.parseDescription(alg.markdown);
      }
      if (alg.website) {
        row.label = `<a href="${alg.website}" target="_blank">${alg.label}</a>`;
        // keep
        row.website = alg.website;
      }
      return row;
    });
    let sorted = this.sortRows(rows);
    this.setState({ rows: sorted });
  }

  render() {
    let loading = isEmpty(this.state.rows);
    let listCards;
    if (this.state.rows) {
      listCards = this.state.rows.map((row, index) => (
        <ListCard value={row} key={index} />
      ));
    }
    let sidebarItems = this.state.rows.map(row => ({
      name: toTitleCase(row.raw_label.replace(/_/g, " ").toLowerCase()),
      value: row.raw_label
    }));
    sidebarItems.unshift({ name: "Overview", value: "overview" });
    return (
      <div>
        {loading ? (
          <Container className="container__heatmap">
            <Card>
              <Preloader />
            </Card>
          </Container>
        ) : (
          <Container className="container-sidebar">
            <Row noGutters>
              <Col xl={2} md={3} sm={12} className="sidebar">
                <Sidebar
                  listItems={sidebarItems}
                  listTitle={"Algorithms In Use"}
                />
              </Col>
              <Col xl={10} md={9} sm={12} className="page__body">
                <Container className="container__heatmap">
                  <Row className="subcontainer justify-content-md-center">
                    <Col lg={12} sm={12} xl={12}>
                      <div className="intro">
                        <p className="big">Algorithms</p>
                      </div>
                    </Col>
                  </Row>
                  <div className="finder" id="overview" />
                  <Row className="subcontainer-final justify-content-md-center">
                    <Col lg={12} sm={12} xl={12}>
                      <div className="card card__std">
                        <div className="content">
                          <div className="card__label">
                            <p>
                              <strong>Overview</strong>
                            </p>
                          </div>
                          <div className="card__footer">
                            <hr />
                            <p>
                              {" "}
                              Generally speaking, a spike sorting algorithm
                              takes in an unfiltered multi-channel timeseries
                              (aka, recording) and a dictionary of algorithm
                              parameters and outputs a list of firing times and
                              associated integer unit labels. This page lists
                              the spike sorting codes we run, as well as some
                              that have yet to be incorporated. Most of the
                              codes were developed at other institutions; two of
                              them are in-house.
                            </p>
                            <p>
                              {" "}
                              SpikeForest uses Python wrappers to implement the
                              algorithms. Links to those may be found in the
                              "Wrapper" links above. For the non-MATLAB sorters,
                              we use singularity containers (similar to docker
                              containers) in order to ensure a reproducible
                              compute environment. In those cases, links to the
                              docker files (environment presciptions) are
                              provided. We almost always use the default
                              parameters of the wrappers, but some may be
                              overriden in the{" "}
                              <a
                                href="https://github.com/flatironinstitute/spikeforest/tree/master/working/main_analysis"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                analysis configuration files
                              </a>
                              .
                            </p>
                            <p>
                              Wrappers were created in collaboration with the{" "}
                              <a
                                href="https://github.com/SpikeInterface/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                SpikeInterface
                              </a>{" "}
                              project. The goal is to ultimately merge these
                              with the corresponding wrappers in
                              SpikeInterface/SpikeToolkit.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
                <Container className="container__heatmap">
                  <Row className="subcontainer-final justify-content-md-center">
                    {listCards}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default Algorithms;
