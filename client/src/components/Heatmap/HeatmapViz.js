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
    console.log('-------------', this.props.studiesWithResults);
    console.log('-------------', this.props.studies);
    console.log('-------------', this.props.studySets);
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
      
      let study_set_names_by_id = {};
      this.props.studysets.map(function(x, i) {
        study_set_names_by_id[x._id] = x.name;
      }, this);

      let study_set_by_study = {};
      let study_set_names = {};
      this.props.studies.map(function(study, i) {
        let study_set_name = study_set_names_by_id[study.studySet];
        study_set_by_study[study.name] = study_set_name;
        study_set_names[study_set_name] = true;
      }, this);
      study_set_names = Object.keys(study_set_names);
      study_set_names.sort();

      let table_rows = [];
      study_set_names.map(function(study_set, ii) {
        let studies_in_study_set = [];
        studiesWithResults.map(function(x, jj) {
          let study_name = Object.keys(x)[0];
          if (study_set_by_study[study_name] === study_set) {
            let y = x[study_name]
            // important to sort the results by sorter so they all line up
            y.sort((a, b) => {
              let textA = a.sorter.toUpperCase();
              let textB = b.sorter.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            })
            studies_in_study_set.push(y);
          }
        }, this);
        let table_row = {
          id: study_set,
          cells: this.compute_table_row_cells_from_study_set(studies_in_study_set, study_set),
          subrows: []
        };
        studies_in_study_set.map(function(study, kk) {
          table_row.subrows.push({
            cells: this.compute_table_row_cells_from_study(study, study_set)
          });
        }, this);
        table_rows.push(table_row);
      }, this);

      /*
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
      */

      let x = studiesWithResults[0]; // first study
      let study_name = Object.keys(x)[0];
      let y = x[study_name];
      let sorter_names = y.map(function(z) {
        return z.sorter;
      });

      console.log('--- =======================================', sorter_names);
      let header_cells = [];
      header_cells.push({
        text:''
      });
      sorter_names.map(function(sorter_name) {
        header_cells.push({
          text:sorter_name,
          rotate:true}
        );
        return null;
      }, this);
      let table_header = {
        cells: header_cells
      };

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

  compute_table_row_cells_from_study_set(studies_in_study_set, study_set) {
    let ret = [];
    ret.push({
      text: study_set,
      selectable: false
    });
    return ret;
  }

  compute_table_row_cells_from_study(study_sorting_results) {
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
        result_column: true,
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
                header={this.state.table_header}
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
