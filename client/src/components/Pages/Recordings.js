import React, { Component } from 'react';
import ReactCollapsingTable from 'react-collapsing-table';
import Preloader from '../Preloader/Preloader';
import { isEmpty } from '../../utils';
import { HashLink as Link } from 'react-router-hash-link';
import { Container } from 'react-bootstrap';

import './pages.css';

class Recordings extends Component {
  render() {
    const studyColumns = [
      {
        accessor: 'name',
        label: 'Study Name',
        priorityLevel: 1,
        position: 1,
        minWidth: 100,
        sortable: true,
      },
      {
        accessor: 'number',
        label: 'Number of recordings',
        priorityLevel: 3,
        position: 3,
        minWidth: 100,
      },
      {
        accessor: 'filesize',
        label: 'Total file size',
        priorityLevel: 4,
        position: 4,
        minWidth: 100,
      },
      {
        accessor: 'channels',
        label: 'Channels',
        priorityLevel: 5,
        position: 5,
        minWidth: 100,
      },
      {
        accessor: 'duration',
        label: 'Duration (in seconds)',
        priorityLevel: 6,
        position: 6,
        minWidth: 100,
      },
      {
        accessor: 'type',
        label: 'Experiment type (synthetic / in vivo / in vitro)',
        priorityLevel: 7,
        position: 7,
        minWidth: 100,
      },
      {
        accessor: 'probetype',
        label: 'Probe type',
        priorityLevel: 8,
        position: 8,
        minWidth: 100,
      },
      {
        accessor: 'region',
        label: 'Brain region',
        priorityLevel: 9,
        position: 9,
        minWidth: 100,
      },
      {
        accessor: 'groundtruth',
        label: 'Groundtruth units',
        priorityLevel: 10,
        position: 10,
        minWidth: 100,
      },
      {
        accessor: 'description',
        label: 'Description',
        priorityLevel: 11,
        position: 11,
        minWidth: 100,
      },
    ];
    const recordingColumns = [
      {
        accessor: 'name',
        label: 'Recording Name',
        priorityLevel: 1,
        position: 1,
        minWidth: 100,
        sortable: true,
      },
      {
        accessor: 'study',
        label: 'Study',
        priorityLevel: 2,
        position: 2,
        minWidth: 100,
      },
      {
        accessor: 'description',
        label: 'Description',
        priorityLevel: 3,
        position: 3,
        minWidth: 100,
      },
    ];
    let loading = isEmpty(this.props.studies) || isEmpty(this.props.recordings);
    return (
      <div>
        <div className="home__body">
          <div className="intro">
            <p className="big">Recordings</p>
            <div className="dividerthick" />
            <p className="updated">Updated on February 14, 2019</p>
            <p className="updated-sub">
              Below is the current list of studies in SpikeForest. Click on each
              to see an expanded list of the recordings within each study.
            </p>
            <p className="jump-container">
              <Link smooth to="/#studies" className="jump-link">
                Jump to Studies
              </Link>
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
            <Preloader id="studies" />
          ) : (
            <div className="subsection">
              <Container id="studies">
                <p className="subsection__title">Studies</p>
                <ReactCollapsingTable
                  showPagination={true}
                  rows={this.props.studies}
                  columns={studyColumns}
                  rowSize={15}
                />
                <p className="subsection__title">Recordings</p>
                <ReactCollapsingTable
                  showPagination={true}
                  rows={this.props.recordings}
                  columns={recordingColumns}
                  rowSize={15}
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
