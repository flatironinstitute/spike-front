import React, { Component } from 'react';
import RepoIcon from '../AlgosBits/RepoIcon';
import DocsIcon from '../AlgosBits/DocsIcon';
import ActiveIcon from '../AlgosBits/ActiveIcon';
import algoRows from '../AlgosBits/algos-copy';
import ReactCollapsingTable from 'react-collapsing-table';
import Preloader from '../Preloader/Preloader';
import { isEmpty } from '../../utils';
import { Container } from 'react-bootstrap';

class Sorters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
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
        accessor: 'name',
        label: 'Name',
        priorityLevel: 1,
        position: 1,
        minWidth: 100,
        sortable: true,
      },
      {
        accessor: 'isActive',
        label: 'Active',
        priorityLevel: 2,
        position: 2,
        minWidth: 100,
        CustomComponent: ActiveIcon,
      },
      {
        accessor: 'latest',
        label: 'Latest',
        priorityLevel: 2,
        position: 2,
        minWidth: 100,
      },
      {
        accessor: 'authors',
        label: 'Authors',
        priorityLevel: 3,
        position: 3,
        minWidth: 150,
      },
      {
        accessor: 'repoUrl',
        label: 'Repo',
        priorityLevel: 4,
        position: 4,
        minWidth: 100,
        CustomComponent: RepoIcon,
      },
      {
        accessor: 'docsUrl',
        label: 'Docs',
        priorityLevel: 4,
        position: 4,
        minWidth: 100,
        CustomComponent: DocsIcon,
      },
    ];
    let loading = isEmpty(this.props.sorters) || isEmpty(this.props.recordings);
    return (
      <div>
        <div className="home__body">
          <div className="intro">
            <p className="big">Sorters</p>
            <div className="dividerthick" />
            <p className="subhead">
              Spike sorting algorithms tested in this project
            </p>
          </div>
          <div className="opener">
            <div className="prose-container">
              <p>
                Generally speaking, spike sorting algorithms take in an
                unfiltered multi-channel timeseries (aka, recording) and a list
                of algorithm parameters, and output a list of firing times and
                associated integer unit labels.
              </p>
              <p>
                This page lists the spike sorting codes we run, as well as some
                that have yet to be incorporated. Most of the codes were
                developed at other institutions; two of them are in-house. Click
                on the links in <b>[column x]</b> to get to the original git
                repo, and <b>[column y]</b> for a docker image that enables you
                to install it easily.
              </p>
              <p>[some info re bundled packages - Jeremy]</p>
            </div>
          </div>
          {loading ? (
            <Preloader />
          ) : (
            <div className="subsection">
              <Container>
                <p className="subsection__title">Sorters</p>
                <ReactCollapsingTable
                  columns={algosColumns}
                  rows={this.state.rows}
                />
              </Container>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Sorters;
