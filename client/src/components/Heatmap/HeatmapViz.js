import React, { Component } from "react";
import { isEmpty } from "../../utils";
import * as Sentry from "@sentry/browser";
import * as d3 from "d3";
import ExpandingHeatmapTable from "./ExpandingHeatmapTable";

class HeatmapViz extends Component {
  constructor(props) {
    super(props);
    this.state = { tableRows: [], tableHeader: [], vizWidth: null };
    this.handleCellSelected = this.handleCellSelected.bind(this);
  }

  componentDidMount() {
    this.buildVizData(this.props.groupedUnitResults);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.groupedUnitResults !== prevProps.groupedUnitResults ||
      this.props.threshold !== prevProps.threshold ||
      this.props.format !== prevProps.format ||
      this.props.metric !== prevProps.metric ||
      this.props.selectedStudySortingResult !==
        prevProps.selectedStudySortingResult
    ) {
      this.buildVizData(this.props.groupedUnitResults);
    }
    if (
      this.state.tableHeader !== prevState.tableHeader ||
      this.state.tableRows !== prevState.tableRows
    ) {
      this.handleChartHeight();
    }
  }

  handleChartHeight() {
    let elmnt = document.getElementById("heatmap-card");
    let height = elmnt.offsetHeight;
    this.props.handleCardHeightChange(height);
  }

  buildVizData(groupedUnitResults) {
    if (groupedUnitResults) {
      // assemble a lookup: study_set_id -> study_set_name which we will need later
      let studySetNamesById = {};
      this.props.studysets.forEach(function(x, i) {
        studySetNamesById[x._id] = x.name;
      }, this);

      // assemble a lookup: study_name -> study_set_name
      // and a collection of study set names
      let studySetByStudy = {}; // lookup study_name -> study_set_name
      let studySetNames = {}; // collection of study set names (will be sorted list below)
      this.props.studies.forEach(function(study, i) {
        let studySetName = studySetNamesById[study.studySet];
        studySetByStudy[study.name] = studySetName;
        studySetNames[studySetName] = true;
      }, this);
      // make it a sorted list
      studySetNames = Object.keys(studySetNames);
      studySetNames.sort();

      // Assemble the table rows (list of objects that will be passed to the ExpandingHeatmapTable component)
      let tableRows = [];
      studySetNames.forEach(function(studySet, ii) {
        // loop through the study sets
        // prepare a list of the studies in the study set (formatted properly for convenience)
        let studiesInStudySet = [];
        groupedUnitResults.forEach(function(studyWithResults, jj) {
          // loop through the studies with results looking for the ones that match the study set
          let studyName = Object.keys(studyWithResults)[0];
          if (studySetByStudy[studyName] === studySet) {
            let studyWithResults0 = studyWithResults[studyName]; // this is necessary because of the somewhat difficult structure of studyWithResults
            // important to sort the results by sorter so they all line up
            studyWithResults0.sort((a, b) => {
              let textA = a.sorter.toUpperCase();
              let textB = b.sorter.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            });
            studiesInStudySet.push(studyWithResults0);
          }
          return null;
        }, this);
        // Here's the table row associated with the study set
        let tableRow = {
          id: studySet,
          cells: this.computeTableRowCellsFromStudySet(
            studiesInStudySet,
            studySet
          ),
          subrows: []
        };
        // loop through the studies in the study set and add a row for each
        studiesInStudySet.forEach(function(study, kk) {
          tableRow.subrows.push({
            cells: this.computeTableRowCellsFromStudy(study, false)
          });
          return null;
        }, this);
        tableRows.push(tableRow);

        // add a spacer row -- which should have the same number of cells and perhaps some formatting associated with the study set
        tableRows.push({
          cells: this.computeEmptyTableRowCellsFromStudy(studiesInStudySet[0])
        });
        return null;
      }, this);

      let x = groupedUnitResults[0]; // first study
      let studyName = Object.keys(x)[0];
      let y = x[studyName];
      let sorterNames = y.map(function(z) {
        return z.sorter;
      });

      let headerCells = [];
      headerCells.push({
        text: ""
      });
      sorterNames.forEach(function(sorterName) {
        headerCells.push({
          text: sorterName,
          rotate: true
        });
        return null;
      }, this);
      let tableHeader = {
        cells: headerCells
      };

      let elmnt = document.getElementById("heatmap-card");
      let width = elmnt.offsetWidth;
      this.setState({
        tableRows: tableRows,
        tableHeader: tableHeader,
        vizWidth: width
      });
    }
  }

  getFormatCopy() {
    let copy;
    switch (this.props.format) {
      case "count":
        copy = `Number of units found above ${this.props.metric} threshold`;
        break;
      case "average":
        copy = `Average ${this.props.metric} above SNR threshold`;
        break;
      case "cpu":
        copy = "Estimated average compute time";
        break;
      default:
        copy = "";
    }
    return copy;
  }

  computeTableRowCellsFromStudySet(list, studySet) {
    let ret = [];
    ret.push({
      text: studySet,
      selectable: false
    });

    let numSorters = list[0].length;
    let aggregated = [];
    for (let i = 0; i < numSorters; i++) {
      aggregated.push({
        accuracies: [],
        recalls: [],
        precisions: [],
        cpus: [],
        snrs: [],
        sorter: list[0][i].sorter,
        study: studySet
      });
    }
    for (let j = 0; j < list.length; j++) {
      for (let i = 0; i < numSorters; i++) {
        aggregated[i].accuracies = aggregated[i].accuracies.concat(
          list[j][i].accuracies
        );
        aggregated[i].recalls = aggregated[i].recalls.concat(
          list[j][i].recalls
        );
        aggregated[i].precisions = aggregated[i].precisions.concat(
          list[j][i].precisions
        );
        aggregated[i].snrs = aggregated[i].snrs.concat(list[j][i].snrs);
        if (this.props.format === "cpu") {
          let cpus0 = this.get_cpu_times_for_study_sorter(
            this.props.cpus,
            list[j][i].study,
            list[j][i].sorter
          );
          aggregated[i].cpus = aggregated[i].cpus.concat(cpus0);
        }
        if (list[j][i].sorter !== aggregated[i].sorter) {
          throw Error(
            "Unexpected... sorter does not match in computeTableRowCellsFromStudySet."
          );
        }
      }
    }

    return this.computeTableRowCellsFromStudy(aggregated, true, studySet);
  }

  computeEmptyTableRowCellsFromStudy(studySortingResults) {
    let ret = [];
    ret.push({
      text: "",
      spacer: true,
      selectable: false
    });
    studySortingResults.forEach(function(studySortingResult) {
      ret.push({
        text: "",
        spacer: true,
        selectable: false
      });
      return null;
    }, this);
    return ret;
  }

  computeTableRowCellsFromStudy(
    studySortingResults,
    isStudySet,
    expandIdOnClick
  ) {
    // Compute the table row cells from a study (or for the aggregated results in a study set)
    let format = this.props.format;
    let metric = this.props.metric;
    let threshold = this.props.threshold;
    let ret = []; // the cells to return
    // the first cell is the name of the study
    ret.push({
      text: (studySortingResults[0] || {}).study,
      expand_id_on_click: expandIdOnClick,
      text_align: "right",
      selectable: false
    });
    let rowNormalize; // whether to normalize the rows
    switch (metric) {
      case "count":
        rowNormalize = true;
        break;
      case "average":
        rowNormalize = false;
        break;
      default:
        rowNormalize = true;
    }
    // loop through the sorting results for the study, and get the metrics (e.g., counts) to display
    let metricList = studySortingResults.map(function(studySortingResult) {
      let metricVals;
      if (format === "count" || format === "average") {
        switch (metric) {
          case "accuracy":
            metricVals = studySortingResult.accuracies;
            break;
          case "recall":
            metricVals = studySortingResult.recalls;
            break;
          case "precision":
            metricVals = studySortingResult.precisions;
            break;
          default:
            throw Error("Unexpected metric: " + metric);
        }
      } else if (format === "cpu") {
        if (isStudySet) {
          // this logic is messy and needs to be cleaned up
          metricVals = studySortingResult.cpus;
        } else {
          metricVals = this.get_cpu_times_for_study_sorter(
            this.props.cpus,
            studySortingResult.study,
            studySortingResult.sorter
          );
        }
      }
      if (format === "count") {
        if (metricVals && metricVals.length > 0) {
          let numAbove = metricVals.filter(val => {
            return val >= threshold; // metric threshold
          });
          return numAbove.length;
        } else {
          return undefined;
        }
      } else if (format === "average") {
        if (metricVals && metricVals.length > 0) {
          let valsToUse = [];
          for (let i = 0; i < studySortingResult.snrs.length; i++) {
            if (studySortingResult.snrs[i] > threshold) {
              valsToUse.push(metricVals[i]);
            }
          }
          let aboveAvg = 0;
          if (valsToUse.length) {
            let sum = valsToUse.reduce((a, b) => a + b);
            aboveAvg = sum / valsToUse.length;
          }
          // This just prints the output to 2 digits
          let avgRounded = Math.round(aboveAvg * 100) / 100;

          return avgRounded;
        } else {
          return undefined;
        }
      } else if (format === "cpu") {
        if (metricVals && metricVals.length > 0) {
          let sum = metricVals.reduce((a, b) => a + b);
          let avg = sum / metricVals.length;
          let avgRounded = Math.round(avg);
          return avgRounded;
        } else {
          return undefined;
        }
      } else {
        Sentry.captureMessage(
          "Unsupported format in computeTableRowCellsFromStudy",
          format
        );
        return undefined;
      }
    }, this);

    // compute the max metric value for row normalization
    let maxMetricVal = 0;
    metricList.forEach(function(val0) {
      if (val0 !== undefined && val0 > maxMetricVal) maxMetricVal = val0;
    }, this);
    if (!rowNormalize) {
      maxMetricVal = 1;
    }

    // For each result, we can now determin the color and text
    studySortingResults.forEach(function(studySortingResult, i) {
      let val0 = metricList[i];
      let text, color, bgcolor;
      if (val0 === undefined) {
        text = "";
        color = "black";
        bgcolor = "white";
      } else {
        text = val0;
        if (maxMetricVal) {
          color = this.computeForegroundColor(val0 / maxMetricVal);
          bgcolor = this.computeBackgroundColor(val0 / maxMetricVal);
        } else {
          color = "black";
          bgcolor = "white";
        }
      }
      // add a cell corresponding to a sorting result
      ret.push({
        id: studySortingResult.study + "--" + studySortingResult.sorter,
        expand_id_on_click: expandIdOnClick,
        color: color,
        bgcolor: bgcolor,
        text: text,
        border_left: true,
        border_right: true,
        text_align: "center",
        selectable: isStudySet ? false : true,
        study_sorting_result: studySortingResult // needed in onCellSelected -> selectStudySortingResult
      });
    }, this);
    return ret;
  }

  computeBackgroundColor(val) {
    // TODO: Swap d3 ranges with these custom ones
    // const colorRanges = {
    //   average: [d3.rgb("#00CEA8"), d3.rgb("#0C4F42")],
    //   count: [d3.rgb("#edf0fc"), d3.rgb("#6B7CC4"), d3.rgb("#102BA3")],
    //   cpu: [d3.rgb("#EFC1E3"), d3.rgb("#B52F93")]
    // };
    let color;
    switch (this.props.format) {
      case "count":
        color = d3.interpolateBlues(val);
        break;
      case "average":
        color = d3.interpolateGreens(val);
        break;
      case "cpu":
        color = d3.interpolateYlOrRd(val);
        break;
      default:
        color = d3.interpolateInferno(val);
        break;
    }
    return color;
  }

  computeForegroundColor(val) {
    return val < 0.5 ? "black" : "white";
  }

  handleCellSelected(cell) {
    this.props.selectStudySortingResult(cell.study_sorting_result);
  }

  get_cpu_times_for_study_sorter(cpus, study, sorter) {
    let ret = [];
    cpus.forEach(function(cpu) {
      if (cpu._id === sorter) {
        cpu.studyGroup.forEach(function(x) {
          if (x.studyName === study) {
            for (let i = 0; i < x.count; i++) {
              ret.push(x.averageCPU);
            }
            return ret;
          }
        });
      }
    });
    return ret;
  }

  render() {
    const loading =
      isEmpty(this.state.tableRows) ||
      isEmpty(this.state.tableHeader) ||
      !this.state.vizWidth;
    const title = this.getFormatCopy();
    const copy =
      this.props.format !== "cpu"
        ? "  Select individual cells to see corresponding scatterplot data."
        : "";
    return (
      <div className="card card--heatmap" id="heatmap-card">
        <div className="card__header">
          <h4 className="card__title">{title}</h4>
        </div>
        <div>
          <p>
            Click on the rows to expand the study sets and see component study
            data.
            {copy}
          </p>
        </div>
        {loading ? (
          <h4>...</h4>
        ) : (
          <div className="heatmap__column">
            <ExpandingHeatmapTable
              header={this.state.tableHeader}
              rows={this.state.tableRows}
              onCellSelected={this.handleCellSelected}
              vizWidth={this.state.vizWidth}
            />
          </div>
        )}
      </div>
    );
  }
}

export default HeatmapViz;
