import React, { Component } from "react";
import HeatmapRow from "./HeatmapRow";
import { isEmpty } from "../../utils";
import * as Sentry from "@sentry/browser";
import ExpandingHeatmapTable from "./ExpandingHeatmapTable"

class HeatmapViz extends Component {
  constructor(props) {
    super(props);
    this.state = { table_rows: [], table_header: [] };
    this.handleCellSelected = this.handleCellSelected.bind(this);
  }

  componentDidMount() {
    this.buildVizData(this.props.studiesWithResults);
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.studiesWithResults !== prevProps.studiesWithResults)
      || (this.props.threshold !== prevProps.threshold)
      || (this.props.format !== prevProps.format)
      || (this.props.metric !== prevProps.metric)
      || (this.props.selectedStudySortingResult !== prevProps.selectedStudySortingResult)
    ) {
      this.buildVizData(this.props.studiesWithResults);
    }
  }

  buildVizData(studiesWithResults) {
    if (studiesWithResults) {
      // jfm will rework this section
      // alphabetize
      let data1 = studiesWithResults.map(study => {
        let values = Object.values(study)[0];
        return values.sort((a, b) => {
          let textA = a.sorter.toUpperCase();
          let textB = b.sorter.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        // TODO: Allow for other sorting
      });

      // alphabetize the studies
      let data2 = data1.sort((a, b) => {
        let textA = a[0].study.toUpperCase();
        let textB = b[0].study.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      let table_rows = data2.map(study => {
        return {
          id: (study[0]||{}).study,
          cells: this.compute_table_row_from_study(study)
        };
      });

      let table_header = [];

      this.setState({
        table_rows: table_rows,
        table_header: table_header
      });
    }
  }

  getFormatCopy() {
    let copy;
    switch (this.props.format) {
      case "count":
        copy = `Number units found above ${this.props.metric} threshold`;
        break;
      case "average":
        copy = `Average ${this.props.metric} above SNR threshold`;
        break;
      case "cpu":
        copy = "Estimated CPU Time";
        break;
      default:
        copy = "";
    }
    return copy;
  }

  compute_table_row_from_study(study_sorting_results) {
    let format = this.props.format;
    let metric = this.props.metric;
    let selected_study_sorting_result = this.props.selectedStudySortingResult;
    let threshold = this.props.threshold;
    let ret = [];
    ret.push({
      text: (study_sorting_results[0]||{}).study,
      selectable: false
    })
    study_sorting_results.map(function (study_sorting_result) {
      let text;
      let color;
      let metric_vals;
      switch (metric) {
        case "accuracy":
          metric_vals = study_sorting_result.accuracies;
          break;
        case "recall":
          metric_vals = study_sorting_result.recalls;
          break;
        case "precision":
          metric_vals = study_sorting_result.precisions;
          break;
        default:
          throw Error('Unexpected metric: ' + metric);
      }
      if (format === 'count') {
        if ((metric_vals) && (metric_vals.length > 0)) {
          let num_above = metric_vals.filter(val => {
            return val >= threshold; // metric threshold
          });
          text = num_above.length + '';
          color = num_above.length;
        }
        else {
          text = '';
          color = 0;
        }
      }
      else if (format === 'average') {
        if ((metric_vals) && (metric_vals.length > 0)) {
          let vals_to_use = [];
          for (let i = 0; i < study_sorting_result.snrs.length; i++) {
            if (study_sorting_result.snrs[i] > threshold) {
              vals_to_use.push(metric_vals[i]);
            }
          }
          let aboveAvg = 0;
          if (vals_to_use.length) {
            let sum = vals_to_use.reduce((a, b) => a + b);
            aboveAvg = sum / vals_to_use.length;
          }
          // This just prints the output to 2 digits
          let avg_rounded = Math.round(aboveAvg * 100) / 100

          text = avg_rounded + '';
          color = avg_rounded;
        }
        else {
          text = '';
          color = 0;
        }
      }
      else {
        Sentry.captureMessage('Unsupported format in compute_row_cell_data', format)
      }
      ret.push({
        id: study_sorting_result.study+'--'+study_sorting_result.sorter,
        color: color,
        text: text,
        selectable: true,
        //selected: (study_sorting_result === selected_study_sorting_result),
        //x: study_sorting_result.sorter,
        //y: study_sorting_result.study,
        study_sorting_result: study_sorting_result // needed in onCellSelected -> selectStudySortingResult
      });
      return null;
    });
    return ret;
  }

  handleCellSelected(cell) {
    this.props.selectStudySortingResult(cell.study_sorting_result);
  }

  render() {
    const loading = isEmpty(this.state.table_rows);
    const title = this.getFormatCopy();

    let header_cells = [];
    header_cells.push({label:''}); // study (or study set) name
    
    let header = {
      cells: header_cells
    };

    let rows = [];
    for (let i = 0; i < 10; i++) {
      let subrows = [];
      for (let j = 0; j < i; j++) {
        subrows.push({
          id: "row" + i + "-" + j,
          cells: [
            {
              label: "content1a",
              bgcolor: "pink",
              id: "row-" + i + "-" + j + "-cell1",
              selectable: true
            },
            {
              label: "content2a",
              id: "row-" + i + "-" + j + "-cell2",
              selectable: true
            }
          ],
          subrows: null
        });
      }
      rows.push({
        id: "row" + i,
        cells: [
          { label: "content1", bgcolor: "yellow", id: "row-" + i + "-cell1" },
          { label: "content2", bgcolor: "lightgreen", id: "row-" + i + "-cell2" }
        ],
        subrows: subrows
      });
    }

    return (
      <div className="card card--heatmap">
        <div className="card__header">
          <h4 className="card__title">{title}</h4>
        </div>
        {loading ? (
          <h4>...</h4>
        ) : (
            <div className="heatmap__column">
              <span>
              <ExpandingHeatmapTable
                header={header}
                rows={this.state.table_rows}
                onCellSelected={this.handleCellSelected}
              />
              {/*this.state.rows.map((row, i) => (
                <HeatmapRow
                  //{...this.props}
                  onSelectCell={(this.props.format !== 'cpu') ? (d) => { this.props.selectStudySortingResult(d.study_sorting_result); } : null}
                  onSelectLabel={(this.props.format !== 'cpu') ? () => {return 'do-nothing'; } : null}
                  cells={row['cell_data']}
                  key={`hmrow${i}`}
                  index={i} // the index of this row (matters whether it is zero or not -- see comment in HeatmapRow)
                  format={this.props.format}
                />
              ))*/}
              </span>
            </div>
          )}
      </div>
    );
  }
}


export default HeatmapViz;
