import React, { Component } from "react";
import { isEmpty } from "../../utils";
import * as Sentry from "@sentry/browser";
import * as d3 from "d3";
import ExpandingHeatmapTable from "./ExpandingHeatmapTable";

import { Link } from "react-router-dom";

class HeatmapViz extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tableRows: [], 
      tableHeader: [], 
      vizWidth: null,
      selectedStudyName: props.selectedStudyName,
      selectedSorterName: props.selectedSorterName
    };
    this.handleCellSelected = this.handleCellSelected.bind(this);
  }

  componentDidMount() {
    this.buildVizData(this.props.studyAnalysisResults);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.studyAnalysisResults !== prevProps.studyAnalysisResults ||
      this.props.threshold !== prevProps.threshold ||
      this.props.format !== prevProps.format ||
      this.props.metric !== prevProps.metric ||
      this.state.selectedStudyName !== prevState.selectedStudyName ||
      this.state.selectedSorterName !== prevState.selectedSorterName
    ) {
      this.buildVizData(this.props.studyAnalysisResults);
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
    if (this.props.handleCardHeightChange)
      this.props.handleCardHeightChange(height);
  }

  buildVizData(studyAnalysisResults) {
    if ((studyAnalysisResults) && (studyAnalysisResults.length > 0)) {

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
      this.studySetByStudy = studySetByStudy;

      // Assemble the table rows (list of objects that will be passed to the ExpandingHeatmapTable component)
      let tableRows = [];
      if (this.props.groupByStudySets) {
        studySetNames.forEach(function(studySet, ii) {
          // loop through the study sets
          // prepare a list of the studies in the study set (formatted properly for convenience)
          let studyAnalysisResultsInStudySet = [];
          studyAnalysisResults.forEach(function(studyAnalysisResult, jj) {
            // loop through the studies with results looking for the ones that match the study set
            let studyName = studyAnalysisResult.studyName;
            if (studySetByStudy[studyName] === studySet) {
              /*
              // important to sort the results by sorter so they all line up
              studyWithResults0.sort((a, b) => {
                let textA = a.sorter.toUpperCase();
                let textB = b.sorter.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              });
              */
              studyAnalysisResultsInStudySet.push(studyAnalysisResult);
            }
            return null;
          }, this);
          // Here's the table row associated with the study set
          let tableRow = {
            id: 'studySet--' + studySet,
            cells: this.computeTableRowCellsFromStudySet(
              studyAnalysisResultsInStudySet,
              studySet
            ),
            subrows: []
          };
          // loop through the study analysis results in the study set and add a row for each
          studyAnalysisResultsInStudySet.forEach(function(studyAnalysisResult, kk) {
            tableRow.subrows.push({
              cells: this.computeTableRowCellsFromStudyAnalysisResult(studyAnalysisResult, false)
            });
            return null;
          }, this);
          tableRows.push(tableRow);

          // add a spacer row -- which should have the same number of cells and perhaps some formatting associated with the study set
          tableRows.push({
            cells: this.computeEmptyTableRowCellsFromStudyAnalysisResult(studyAnalysisResultsInStudySet[0])
          });
          return null;
        }, this);
      }
      else {
        this.props.studyAnalysisResults.forEach(function(studyAnalysisResult) {
          tableRows.push({
            cells: this.computeTableRowCellsFromStudyAnalysisResult(studyAnalysisResult, false)
          });
        }, this);
      }

      let sar = studyAnalysisResults[0]; // first study analysis result
      let sorterNames = sar.sortingResults.map(function(sr) {
        return sr.sorterName;
      });

      let headerCells = [];
      headerCells.push({
        text: ""
      });
      sorterNames.forEach(function(sorterName) {
        headerCells.push({
          text: sorterName,
          link: '/algorithms',
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

  computeTableRowCellsFromStudySet(studyAnalysisResults, studySetName) {
    let aggregatedStudyAnalysisResult = this.aggregateStudyAnalysisResults(studyAnalysisResults, studySetName);
    return this.computeTableRowCellsFromStudyAnalysisResult(aggregatedStudyAnalysisResult, true, 'studySet--' + studySetName);
  }

  aggregateStudyAnalysisResults(studyAnalysisResults, studySetName) {
    let numSorters = studyAnalysisResults[0].sortingResults.length;

    let trueSnrs = [];
    let trueFiringRates = [];
    let trueNumEvents = [];
    // ...
    let sortingResults = [];
    for (let ii = 0; ii < numSorters; ii++) {
      sortingResults.push({
        accuracies: [],
        precisions: [],
        recalls: [],
        numMatches: [],
        numFalsePositives: [],
        numFalseNegatives: [],
        cpuTimesSec: []
      });
    }

    studyAnalysisResults.forEach((studyAnalysisResult) => {
      trueSnrs = trueSnrs.concat(studyAnalysisResult.trueSnrs);
      trueFiringRates = trueFiringRates.concat(studyAnalysisResult.trueFiringRates);
      trueNumEvents = trueNumEvents.concat(studyAnalysisResult.trueNumEvents);
      // ...
      for (let ii = 0; ii < numSorters; ii++) {
        sortingResults[ii].accuracies = sortingResults[ii].accuracies.concat(studyAnalysisResult.sortingResults[ii].accuracies);
        sortingResults[ii].precisions = sortingResults[ii].precisions.concat(studyAnalysisResult.sortingResults[ii].precisions);
        sortingResults[ii].recalls = sortingResults[ii].recalls.concat(studyAnalysisResult.sortingResults[ii].recalls);
        sortingResults[ii].numMatches = sortingResults[ii].numMatches.concat(studyAnalysisResult.sortingResults[ii].numMatches);
        sortingResults[ii].numFalsePositives = sortingResults[ii].numFalsePositives.concat(studyAnalysisResult.sortingResults[ii].numFalsePositives);
        sortingResults[ii].numFalseNegatives = sortingResults[ii].numFalseNegatives.concat(studyAnalysisResult.sortingResults[ii].numFalseNegatives);
        sortingResults[ii].cpuTimesSec = sortingResults[ii].cpuTimesSec.concat(studyAnalysisResult.sortingResults[ii].cpuTimesSec);
      }
    })

    return {
      studyName: studySetName,
      trueSnrs: trueSnrs,
      trueFiringRates: trueFiringRates,
      trueNumEvents: trueNumEvents,
      // ...
      sortingResults: sortingResults
    };

    /*
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
    */
  }

  computeEmptyTableRowCellsFromStudyAnalysisResult(studyAnalysisResult) {
    let ret = [];
    ret.push({
      text: "",
      spacer: true,
      selectable: false
    });
    studyAnalysisResult.sortingResults.forEach(function(sr) {
      ret.push({
        text: "",
        spacer: true,
        selectable: false
      });
      return null;
    }, this);
    return ret;
  }

  computeTableRowCellsFromStudyAnalysisResult(
    studyAnalysisResult,
    isStudySet,
    expandIdOnClick
  ) {
    // Compute the table row cells from a study (or for the aggregated results in a study set)
    let format = this.props.format;
    let metric = this.props.metric;
    let threshold = this.props.threshold;
    let ret = []; // the cells to return
    // the first cell is the name of the study
    let link = isStudySet ? null : `/studyresults/${studyAnalysisResult.studyName}`;
    let name0 = studyAnalysisResult.studyName;
    if (!this.props.groupByStudySets) {
      name0 = this.studySetByStudy[studyAnalysisResult.studyName]+' '+studyAnalysisResult.studyName;
    }
    ret.push({
      text: name0,
      link: link,
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
    let trueSnrs = studyAnalysisResult.trueSnrs;
    // loop through the sorting results for the study, and get the metrics (e.g., counts) to display
    let cellvalList = studyAnalysisResult.sortingResults.map(function(sortingResult) {
      let metricVals;
      if (format === "count" || format === "average") {
        switch (metric) {
          case "accuracy":
            metricVals = sortingResult.accuracies;
            break;
          case "recall":
            metricVals = sortingResult.recalls;
            break;
          case "precision":
            metricVals = sortingResult.precisions;
            break;
          default:
            throw Error("Unexpected metric: " + metric);
        }
      } else if (format === "cpu") {
        metricVals = sortingResult.cpuTimesSec;
      }
      let num_found = 0;
      let num_missing = 0
      for (let i = 0; i < trueSnrs.length; i++) {
        let val0 = sortingResult.accuracies[i];
        if (this.isNumeric(val0)) {
          num_found++;
        }
        else {
          num_missing++;
        }
      }
      if (num_found === 0)
        return {value: undefined, num_missing:num_missing};

      if (format === "count") {
        if (metricVals && metricVals.length > 0) {
          let numAbove = metricVals.filter(val => {
            return ((this.isNumeric(val)) && (val >= threshold)); // metric threshold
          });
          return {value: numAbove.length, num_missing:num_missing};
        } else {
          return {value: undefined, num_missing:num_missing};
        }
      } else if (format === "average") {
        if (metricVals && metricVals.length > 0) {
          let valsToUse = [];
          for (let i = 0; i < trueSnrs.length; i++) {
            if (trueSnrs[i] > threshold) {
              let val0 = metricVals[i];
              if (this.isNumeric(val0)) {
                valsToUse.push(metricVals[i]);
              }
            }
          }
          let aboveAvg = 0;
          if (valsToUse.length) {
            let sum = valsToUse.reduce((a, b) => a + b);
            aboveAvg = sum / valsToUse.length;
          }

          // This just prints the output to 2 digits
          let avgRounded = Math.round(aboveAvg * 100) / 100;
          return {value: avgRounded, num_missing:num_missing};
        } else {
          return {value: undefined, num_missing:num_missing};
        }
      } else if (format === "cpu") {
        if (metricVals && metricVals.length > 0) {
          let sum = metricVals.reduce((a, b) => a + b);
          let avg = sum / metricVals.length;
          let avgRounded = Math.round(avg);
          return {value: avgRounded, num_missing:num_missing};
        } else {
          return {value: undefined, num_missing:num_missing};
        }
      } else {
        Sentry.captureMessage(
          "Unsupported format in computeTableRowCellsFromStudy",
          format
        );
        return {value: undefined, num_missing:num_missing};
      }
    }, this);

    let maxMetricVal = 0;
    cellvalList.forEach(x => {
      if ((this.isNumeric(x.value)) && (x.value > maxMetricVal))
        maxMetricVal = x.value;
    })

    // For each result, we can now determin the color and text
    studyAnalysisResult.sortingResults.forEach(function(sortingResult, i) {
      let val0 = cellvalList[i].value;
      let text, color, bgcolor;
      if (val0 === undefined) {
        text = "";
        color = "black";
        bgcolor = "white";
      } else {
        text = val0;
        if (cellvalList[i].num_missing > 0)
          text += '*';
        if ((rowNormalize) && (maxMetricVal)) {
          val0 = val0 / maxMetricVal;
        }
        if (maxMetricVal) {
          color = this.computeForegroundColor(val0);
          bgcolor = this.computeBackgroundColor(val0);
        } else {
          color = "black";
          bgcolor = "white";
        }
      }
      // add a cell corresponding to a sorting result
      ret.push({
        id: studyAnalysisResult.studyName + "--" + sortingResult.sorterName,
        expand_id_on_click: expandIdOnClick,
        color: color,
        bgcolor: bgcolor,
        text: text,
        border_left: true,
        border_right: true,
        text_align: "center",
        selectable: isStudySet ? false : true,
        selected: ((studyAnalysisResult.studyName === this.state.selectedStudyName) && (sortingResult.sorterName === this.state.selectedSorterName)),
        info: {
          studyName: studyAnalysisResult.studyName,
          sorterName: sortingResult.sorterName
        } // needed in onCellSelected -> selectStudyName, selectSorterName
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
    if (cell.selectable) {
      if (this.props.selectStudyName)
        this.props.selectStudyName(cell.info.studyName);
      if (this.props.selectSorterName)
        this.props.selectSorterName(cell.info.sorterName);
      this.setState({
        selectedStudyName: cell.info.studyName,
        selectedSorterName: cell.info.sorterName
      });
    }
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

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  render() {
    const loading =
      isEmpty(this.state.tableRows) ||
      isEmpty(this.state.tableHeader) ||
      !this.state.vizWidth;
    const title = this.getFormatCopy();
    const copy =
      this.props.format !== "cpu"
        ? "  Select individual cells to see corresponding details. "
        : "";
    let divStyle = {
      backgroundColor: "#fffdc0",
      borderRadius: "5px",
      display: "inline-block"
    };
    return (
      <div className="card card--heatmap" id="heatmap-card">
        <div className="card__header">
          <h4 className="card__title">{title}</h4>
        </div>
        <div>
          {
            this.props.groupByStudySets ?
            (
              <span>
                <p style={divStyle}>
                  {
                    this.props.format === 'cpu' ?
                    (
                      <span>These numbers reflect actual compute times on our cluster and are not meant to be a rigorous benchmark. The algorithms were applied in batches, with many different algorithms possibly running
                        simultaneously on the same machine. Some runs may have been allocated more CPU cores than others. We are working toward a more accurate compute time test.
                      </span>
                    ) :
                    (
                      <span>These are preliminary results prior to parameter optimization, and we are still in the process of ensuring that we are using the proper <Link to="/algorithms">versions of the spike sorters</Link>.</span>
                    )
                  }
                </p>
                <p>
                  Click to expand study set rows and see component study data. {copy} * An asterisk indicates an incomplete or failed sorting on a subset of results.</p>
              </span>
            ) :
            (
              <span>
                <p>{copy} * An asterisk indicates an incomplete or failed sorting on a subset of results.</p>
              </span>
            )
          }
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
