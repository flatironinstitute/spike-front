import React, { Component } from "react";
import Header from "./Header";
import RepoIcon from "./RepoIcon";
import DocsIcon from "./DocsIcon";
import ActiveIcon from "./ActiveIcon";
import algoRows from "../algos-copy";
import ReactCollapsingTable from "react-collapsing-table";

class Algos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    if (this.props.sorters.length) {
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
        label: "Active",
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
    return (
      <div>
        <div className="container container__body container__body--algos">
          <Header headerCopy={this.props.header} />
        </div>
        <div className="container container__algos">
          <ReactCollapsingTable columns={algosColumns} rows={this.state.rows} />
        </div>
      </div>
    );
  }
}
export default Algos;
