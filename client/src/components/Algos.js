import React, { Component } from "react";
import Header from "./Header";
import RepoIcon from "./RepoIcon";
import DocsIcon from "./DocsIcon";
import algoRows from "../algos-copy";
import ReactCollapsingTable from "react-collapsing-table";

class Algos extends Component {
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
        <div className="container container--body">
          <Header headerCopy={this.props.header} />
        </div>
        <div className="container">
          <ReactCollapsingTable columns={algosColumns} rows={algoRows} />
        </div>
      </div>
    );
  }
}
export default Algos;
