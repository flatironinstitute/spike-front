import React, { Component } from "react";
import HeatmapRow from "./HeatmapRow";
import { isEmpty } from "../../utils";
import { SentryError } from "@sentry/core";
import * as Sentry from "@sentry/browser";

class HeatmapViz extends Component {
  constructor(props) {
    super(props);
    this.state = { row_group_data: [], expanded_study_sets: {} };
    this.handleSelectStudyCell = this.handleSelectStudyCell.bind(this);
    this.handleSelectStudySetCell = this.handleSelectStudySetCell.bind(this);
  }

  componentDidMount() {
    this.buildVizData(this.props.studiesWithResults);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
        (this.props.studiesWithResults !== prevProps.studiesWithResults)
        || (this.props.threshold !== prevProps.threshold)
        || (this.props.format !== prevProps.format)
        || (this.props.metric !== prevProps.metric)
        || (this.props.selectedStudySortingResult !== prevProps.selectedStudySortingResult )
    ) {
      this.buildVizData(this.props.studiesWithResults);
    }
  }

  buildVizData(studiesWithResults) {
    let that = this;
    if (studiesWithResults) {

      let study_set_names_by_id = {};
      this.props.studysets.forEach(function(x) {
        study_set_names_by_id[x._id] = x.name;
      });

      let study_set_by_study = {};
      let study_set_names = {};
      this.props.studies.forEach(function(study) {
        let study_set_name = study_set_names_by_id[study.studySet];
        study_set_by_study[study.name] = study_set_name;
        study_set_names[study_set_name] = true;
      });
      study_set_names = Object.keys(study_set_names);
      study_set_names.sort();

      let row_group_data = [];
      study_set_names.forEach(function(study_set) {
        let studies_in_study_set = [];
        studiesWithResults.forEach(function(x) {
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
        });
        let row_group_datum = {
          study_set: study_set,
          cell_data: that.compute_row_cell_data_for_study_set(studies_in_study_set, study_set),
          subrows: []
        }
        studies_in_study_set.forEach(function(study) {
          row_group_datum.subrows.push({
            cell_data: that.compute_row_cell_data(study, study_set)
          });
        });
        row_group_data.push(row_group_datum);
      });

      this.setState({
        row_group_data: row_group_data
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

  compute_row_cell_data_for_study_set(list, study_set) {
    let num_sorters = list[0].length;
    let aggregated = [];
    for (let i=0; i<num_sorters; i++) {
      aggregated.push({
        accuracies:[],
        recalls:[],
        precisions:[],
        snrs:[],
        sorter:list[0][i].sorter,
        study:study_set
      });
    }
    for (let j=0; j<list.length; j++) {
      for (let i=0; i<num_sorters; i++) {
        aggregated[i].accuracies = aggregated[i].accuracies.concat(list[j][i].accuracies);  
        aggregated[i].recalls = aggregated[i].recalls.concat(list[j][i].recalls);
        aggregated[i].precisions = aggregated[i].precisions.concat(list[j][i].accuracies);
        aggregated[i].snrs = aggregated[i].snrs.concat(list[j][i].snrs);
        if (list[j][i].sorter !== aggregated[i].sorter) {
          throw Error('Unexpected... sorter does not match in compute_row_cell_data_for_study_set.');
        }
      }
    }
    return this.compute_row_cell_data(aggregated, study_set);
  }

  compute_row_cell_data(study_sorting_results, study_set) {
    let format = this.props.format;
    let metric = this.props.metric;
    let selected_study_sorting_result = this.props.selectedStudySortingResult;
    let threshold = this.props.threshold;
    return study_sorting_results.map(function (study_sorting_result) {
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
      return {
        color:color,
        text:text,
        selected:(study_sorting_result === selected_study_sorting_result),
        x:study_sorting_result.sorter,
        y:study_sorting_result.study,
        study_sorting_result:study_sorting_result, // needed in onSelectCell -> selectStudySortingResult
        study_set:study_set
      }
    });
  }

  handleSelectStudyCell(d) {
    this.props.selectStudySortingResult(d.study_sorting_result);
  }

  handleSelectStudySetCell(d) {
    let a = this.state.expanded_study_sets;
    a[d.study_set] = !(a[d.study_set])
    this.setState({expanded_study_sets: a});
  }
  
  render() {
    for (let i=0; i<this.state.row_group_data.length; i++) {
      let x = this.state.row_group_data[i];
      if (this.state.expanded_study_sets[x.study_set]) {
        x.subrows_to_show = x.subrows;
        x.expanded = true;
      }
      else {
        x.subrows_to_show = [];
        x.expanded = false;
      }
    }
    const loading = isEmpty(this.state.row_group_data);
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
            {this.state.row_group_data.map((row_group, i) => (
              <span>
                <HeatmapRow
                  onSelectCell={this.handleSelectStudySetCell}
                  onSelectLabel={this.handleSelectStudySetCell}
                  cells={row_group['cell_data']}
                  rowtype={'large'}
                  key={`study-set-${row_group.study_set}-${i}`} // make sure it gets a unique key
                  showXLabels={(i==0)}
                  format={this.props.format}
                />
                <span>
                  {
                    row_group.expanded ? (
                      <span>
                        <span>
                          {row_group.subrows.map((subrow, j) => (
                            <HeatmapRow
                              onSelectCell={this.handleSelectStudyCell}
                              onSelectLabel={this.handleSelectStudyCell}
                              cells={subrow['cell_data']}
                              rowtype={'small'}
                              key={`study-${row_group.study_set}-${i}-${j}`} // make sure it gets a unique key
                              showXLabels={false}
                              format={this.props.format}
                            />
                          ))}
                        </span>
                        <div style={{height:'40px'}}></div>
                      </span>
                    ) : <span></span>
                  }
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
}


export default HeatmapViz;
