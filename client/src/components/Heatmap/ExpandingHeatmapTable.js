import React from "react";
import { Table } from "react-bootstrap";

import "./expandingheatmaptable.css";
import { Link } from "react-router-dom";

class ExpandingHeatmapTable extends React.Component {
  // props are rows and header
  constructor(props) {
    super(props);

    let selectedCellId = null;
    props.rows.forEach(row => {
      row.cells.forEach(c => {
        if (c.selected) {
          selectedCellId = c.id;
        }
      });
    });

    this.state = {
      expandedRowIds: {},
      selectedCellId: selectedCellId
    };

    this.handleCollapse = this.handleCollapse.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleCellSelected(cell) {
    if (cell.expand_id_on_click) {
      this.handleToggle(cell.expand_id_on_click);
    }
    if (!cell.selectable) return;
    this.setState({
      selectedCellId: cell["id"]
    });
    if (this.props.onCellSelected) {
      this.props.onCellSelected(cell);
    }
  }

  createTableCell(cell, index, opts) {
    opts = opts || {};
    let classes0 = [];
    if (cell["id"] === this.state.selectedCellId) classes0.push("selected");
    if (cell["rotate"]) classes0.push("rotate");
    if (cell["border_right"]) classes0.push("border_right");
    if (cell["border_top"]) classes0.push("border_top");
    if (cell["selectable"]) {
      classes0.push("selectable");
    }
    if (cell["spacer"]) classes0.push("spacer");
    if (cell.expand_id_on_click) classes0.push("expandable");
    let class0 = classes0.join(" ");
    let style0 = {
      color: cell.color || "black",
      backgroundColor: cell.bgcolor || "white",
      textAlign: cell.text_align || "left"
    };
    if (cell.text_align === "right") style0.paddingRight = "4px";
    let cellContent = cell.text;
    if (cell.link) cellContent = <Link to={cell.link}>{cellContent}</Link>;
    if (opts.empty_content) {
      cellContent = <span />;
      style0 = {};
    }
    // console.log("tablecell", cell.id, cell.text);
    return (
      <td
        onClick={() => this.handleCellSelected(cell)}
        className={class0}
        style={style0}
        key={cell["id"]}
      >
        <div>
          <span> {cellContent}</span>
        </div>
      </td>
    );
  }

  createTableRows(row, isSubrow, index) {
    // Return map
    let ret = [];
    // Row Id
    let id0 = row.id || null;
    // isExpanded
    let isExpanded = this.state.expandedRowIds[id0];
    // Table cells
    let tds = [];
    // Create collapse button cells
    if (row.subrows && row.subrows.length > 0) {
      if (isExpanded) {
        tds.push(
          <td key={"collapse-button-" + id0}>
            {this.createCollapseButton(id0)}
          </td>
        );
      } else {
        tds.push(
          <td key={"expand-button-" + id0}>{this.createExpandButton(id0)}</td>
        );
      }
    } else {
      tds.push(<td key={"empty-cell-" + id0} />);
    }
    // Create the Other Cells
    row.cells.forEach((c, i) => {
      if (!isExpanded || i === 0) {
        tds.push(this.createTableCell(c, i));
      } else {
        tds.push(this.createTableCell(c, i, { empty_content: true }));
      }
    });
    // Create Rows and put cells in
    ret.push(
      <tr className={isSubrow ? "subrow" : "toprow"} key={"row-key-" + id0}>
        {tds}
      </tr>
    );
    // Add the Expanded Rows
    if (isExpanded) {
      if (row.subrows && row.subrows.length > 0) {
        row.subrows.forEach(function(subrow, i) {
          let trs0 = this.createTableRows(subrow, true, i);
          ret = ret.concat(trs0);
          return null;
        }, this);
        ret.push(
          <tr key={"expanded-empty-" + id0}>
            <td>&nbsp;</td>
          </tr>
        );
      }
    }
    return ret;
  }

  handleCollapse(id) {
    let x = this.state.expandedRowIds;
    x[id] = false;
    this.setState({
      expandedRowIds: x
    });
  }

  handleExpand(id) {
    let x = this.state.expandedRowIds;
    x[id] = true;
    this.setState({
      expandedRowIds: x
    });
  }

  handleToggle(id) {
    let x = this.state.expandedRowIds;
    x[id] = !x[id];
    this.setState({
      expandedRowIds: x
    });
  }

  createCollapseButton(id) {
    return (
      <div onClick={() => this.handleCollapse(id)}>
        <span className="expandable-button">{"-"}</span>
      </div>
    );
  }

  createExpandButton(id) {
    return (
      <div onClick={() => this.handleExpand(id)}>
        <span className="expandable-button">{"+"}</span>
      </div>
    );
  }

  render() {
    let trhead = this.createTableRows(this.props.header, false, 0);
    let trs = this.props.rows.map((row, i) => {
      return this.createTableRows(row, false, i);
    });
    return (
      <div>
        <Table borderless responsive className="expandingheatmaptable">
          <thead>{trhead}</thead>
          <tbody>{trs}</tbody>
        </Table>
      </div>
    );
  }
}

export default ExpandingHeatmapTable;
