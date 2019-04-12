import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import { isEmpty } from "../../utils";
import { Container } from "react-bootstrap";

import "./pages.css";
import RecordingsTable from "../Recordings/RecordingsTable";
import ExpandableRecordingsTable from "../Recordings/ExpandableRecordingsTable";

class Recordings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupedRecordings: {}
    };
  }
  componentDidMount() {
    if (this.props.recordings) {
      let grouped = this.groupBy(
        this.props.recordings,
        recording => recording.recordings[0].studySetName
      );
      this.setState({ groupedRecordings: grouped });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.recordings !== this.props.recordings) {
      let grouped = this.groupBy(
        this.props.recordings,
        recording => recording.recordings[0].studySetName
      );
      this.setState({ groupedRecordings: grouped });
    }
  }

  groupBy(list, keyGetter) {
    const map = {};
    list.forEach(item => {
      const key = keyGetter(item);
      if (!map[key]) {
        map[key] = [item];
      } else {
        map[key].push(item);
      }
    });
    return map;
  }

  render() {
    let loading =
      isEmpty(this.state.groupedRecordings) && isEmpty(this.props.studies);
    return (
      <div>
        <div className="page__body recordings__body">
          <div className="intro">
            <p className="big">Recordings</p>
            <div className="dividerthick" />
            <p className="updated-sub">
              Below is the current list of studies in SpikeForest. Click on each
              to see an expanded list of the recordings within each study.
            </p>
            <p className="subhead">
              Our hosted recordings include many popular probe geometries and
              types, and fall into three categories:
            </p>
            <div className="list__section">
              <span className="list__heading">1. Paired (in vivo)</span>
              <span className="list__body">
                Recordings from various laboratories where an independent intra-
                or juxta-cellular probe provides reliable ground-truth firing
                events, usually for one neuron per recording.
              </span>
            </div>
            <div className="list__section">
              <span className="list__heading">2. Simulated (in silico)</span>
              <span className="list__body">
                Recordings from neural simulator codes with various degrees of
                fidelity, with known firing events for large numbers of neurons.
              </span>
            </div>
            <div className="list__section">
              <span className="list__heading">3. Human-curated</span>
              <span className="list__body">
                We also host a small set of expert human-curated sorting
                results.
              </span>
            </div>
          </div>
          <div className="opener">
            <div className="prose-container">
              <p>
                Recordings are grouped into "studies". Each study contains a set
                of real or synthesized recordings sharing a common source (probe
                and brain region, or simulation code settings). It is
                appropriate to aggregate the statistics from all recordings
                within a particular study.
              </p>
              <p>
                In turn, studies are grouped into "study sets". Each study set
                is a collection of studies which have different parameters but
                share some common features.
              </p>
            </div>
          </div>
          {loading ? (
            <Preloader />
          ) : (
            <div className="container__recording">
              <Container fluid>
                <ExpandableRecordingsTable
                  {...this.props}
                  groupedRecordings={this.state.groupedRecordings}
                />
              </Container>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Recordings;
