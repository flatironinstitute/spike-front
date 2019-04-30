import React, { Component } from "react";
import HeatmapRow from "./HeatmapRow";
import { isEmpty } from "../../utils";
import * as Sentry from "@sentry/browser";

class HeatmapViz extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
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

      let rows = data2.map(study => {
        return {
          cell_data: this.compute_row_cell_data(study)
        };
      });

      this.setState({
        rows: rows
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

  compute_row_cell_data(study_sorting_results) {
    let format = this.props.format;
    let metric = this.props.metric;
    let selected_study_sorting_result = this.props.selectedStudySortingResult;
    let threshold = this.props.threshold;
    return study_sorting_results.map(function (studySortingResult) {
      let text;
      let color;
      let metric_vals;
      switch (metric) {
        case "accuracy":
          metric_vals = studySortingResult.accuracies;
          break;
        case "recall":
          metric_vals = studySortingResult.recalls;
          break;
        case "precision":
          metric_vals = studySortingResult.precisions;
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
          for (let i = 0; i < studySortingResult.snrs.length; i++) {
            if (studySortingResult.snrs[i] > threshold) {
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
      return {
        color: color,
        text: text,
        selected: (studySortingResult === selected_study_sorting_result),
        x: studySortingResult.sorter,
        y: studySortingResult.study,
        studySortingResult: studySortingResult // needed in onSelectCell -> selectStudySortingResult
      }
    });
  }

  render() {
    const loading = isEmpty(this.state.rows);
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
              {this.state.rows.map((row, i) => (
                <HeatmapRow
                  //{...this.props}
                  onSelectCell={(this.props.format !== 'cpu') ? (d) => { this.props.selectStudySortingResult(d.studySortingResult); } : null}
                  onSelectLabel={(this.props.format !== 'cpu') ? () => {/*do nothing for now*/ } : null}
                  cells={row['cell_data']}
                  key={`hmrow${i}`}
                  index={i} // the index of this row (matters whether it is zero or not -- see comment in HeatmapRow)
                  format={this.props.format}
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}


export default HeatmapViz;
