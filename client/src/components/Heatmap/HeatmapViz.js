import React, { Component } from "react";
import { isEmpty } from "../../utils";
import * as Sentry from "@sentry/browser";
import * as d3 from "d3";
import ExpandingHeatmapTable from "./ExpandingHeatmapTable";

let imputeMissingValues = require("./imputeMissingValues.js");

class HeatmapViz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableRows: [],
      tableHeader: []
    };
    this.studySetNamesByStudyName = {};
  }

  componentDidMount() {
    this.buildVizData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.studySets !== prevProps.studySets ||
      this.props.studyAnalysisResults !== prevProps.studyAnalysisResults ||
      this.props.threshold !== prevProps.threshold ||
      this.props.format !== prevProps.format ||
      this.props.metric !== prevProps.metric ||
      this.props.imputeMissingValues !== prevProps.imputeMissingValues ||
      this.state.selectedStudyName !== prevState.selectedStudyName ||
      this.state.selectedRecordingName !== prevState.selectedRecordingName ||
      this.state.selectedSorterName !== prevState.selectedSorterName
    ) {
      this.buildVizData();
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

  buildVizData() {
    let sortedStudySets = this.props.studySets;
    // Note: study sets are sorted alphabetically by name on initial fetch

    this.studySetNamesByStudyName = {};
    for (let studySet of this.props.studySets) {
      for (let study of studySet.studies) {
        this.studySetNamesByStudyName[study.name] = studySet.name;
      }
    }

    if (this.props.groupByStudySets) {
      const studySetGroupStrings = ["PAIRED_", "SYNTH_", "HYBRID_", "MANUAL_"];
      sortedStudySets = [];
      for (let groupString of studySetGroupStrings) {
        for (let studySet of this.props.studySets) {
          if (studySet.name.includes(groupString)) {
            sortedStudySets.push(studySet);
          }
        }
        // empty row
        sortedStudySets.push(null);
      }
    }

    let studyAnalysisResultsByStudyName = {};
    for (let studyAnalysisResult of this.props.studyAnalysisResults
      .allResults) {
      studyAnalysisResultsByStudyName[
        studyAnalysisResult.studyName
      ] = studyAnalysisResult;
    }

    // Assemble the table rows (list of objects that will be passed to the ExpandingHeatmapTable component)
    let tableRows = [];
    if (this.props.groupByStudySets) {
      for (let studySet of sortedStudySets) {
        if (studySet) {
          // Here's the table row associated with the study set
          let tableRow = {
            id: "studySet--" + studySet.name,
            cells: this.computeTableRowCellsFromStudySet(studySet),
            subrows: []
          };
          for (let study of studySet.studies) {
            let studyAnalysisResult =
              studyAnalysisResultsByStudyName[study.name] || null;
            if (studyAnalysisResult) {
              tableRow.subrows.push({
                id: `subrow--${studySet.name}-${study.name}`,
                cells: this.computeTableRowCellsFromStudyAnalysisResult(
                  studyAnalysisResult,
                  {}
                )
              });
            }
          }
          tableRows.push(tableRow);
        } else {
          // empty row
          let tableRow = {
            id: `empty--${tableRows.length}`,
            cells: this.computeEmptyTableRowCells(`empty--${tableRows.length}`),
            subrows: []
          };
          tableRows.push(tableRow);
        }
      }
    } else {
      for (let studyAnalysisResult of this.props.studyAnalysisResults
        .allResults) {
        let tableRow = {
          id: `sar--${studyAnalysisResult.studyName}`,
          cells: this.computeTableRowCellsFromStudyAnalysisResult(
            studyAnalysisResult,
            {}
          ),
          subrows: []
        };
        let sar = studyAnalysisResult;
        for (let recind = 0; recind < sar.recordingNames.length; recind++) {
          let recname = sar.recordingNames[recind];
          tableRow.subrows.push({
            id: `sar--${studyAnalysisResult.studyName}--${recname}`,
            cells: this.computeTableRowCellsFromStudyAnalysisResultRecording(
              studyAnalysisResult,
              recind,
              recname
            )
          });
        }
        tableRows.push(tableRow);
      }
    }

    let headerCells = [];
    headerCells.push({
      id: "header-sorter--",
      text: ""
    });
    let sorter_names = [];
    for (let sorter of this.props.sorters) {
      sorter_names.push(sorter.name);
    }
    sorter_names.sort();
    for (let sorter_name of sorter_names) {
      headerCells.push({
        id: "header-sorter-" + sorter_name,
        text: sorter_name,
        link: "/algorithms",
        rotate: true
      });
    }
    let tableHeader = {
      id: "table-header",
      cells: headerCells
    };

    this.setState({
      tableRows: tableRows,
      tableHeader: tableHeader
    });
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
        copy = "Estimated average compute time per recording (sec)";
        break;
      default:
        copy = "";
    }
    return copy;
  }

  computeTableRowCellsFromStudySet(studySet) {
    let aggregatedStudyAnalysisResult = this.aggregateStudyAnalysisResults(
      studySet
    );
    return this.computeTableRowCellsFromStudyAnalysisResult(
      aggregatedStudyAnalysisResult,
      { isStudySet: true, expandIdOnClick: "studySet--" + studySet.name }
    );
  }

  computeTableRowCellsFromStudyAnalysisResultRecording(
    studyAnalysisResult,
    recordingIndex,
    recordingName
  ) {
    let sar = this.getStudyAnalysisResultForRecording(
      studyAnalysisResult,
      recordingIndex,
      recordingName
    );
    return this.computeTableRowCellsFromStudyAnalysisResult(sar, {});
  }

  getStudyAnalysisResultForRecording(
    studyAnalysisResult,
    recordingIndex,
    recordingName
  ) {
    let trueSnrs = [];
    let trueFiringRates = [];
    let trueNumEvents = [];
    // ...
    let sortingResults = [];
    let sorter_names = [];
    for (let sorter of this.props.sorters) {
      sorter_names.push(sorter.name);
    }
    sorter_names.sort();
    for (let sorter_name of sorter_names) {
      sortingResults.push({
        accuracies: [],
        precisions: [],
        recalls: [],
        numMatches: [],
        numFalsePositives: [],
        numFalseNegatives: [],
        cpuTimesSec: [],
        sorterName: sorter_name
      });
    }

    let sar = studyAnalysisResult;
    for (let jj = 0; jj < sar.trueRecordingIndices.length; jj++) {
      if (sar.trueRecordingIndices[jj] === recordingIndex) {
        trueSnrs.push(sar.trueSnrs[jj]);
        trueFiringRates.push(sar.trueFiringRates[jj]);
        trueNumEvents.push(sar.trueNumEvents[jj]);
        for (let ii = 0; ii < sorter_names.length; ii++) {
          sortingResults[ii].accuracies.push(
            sar.sortingResults[ii].accuracies[jj]
          );
          sortingResults[ii].precisions.push(
            sar.sortingResults[ii].precisions[jj]
          );
          sortingResults[ii].recalls.push(sar.sortingResults[ii].recalls[jj]);
          sortingResults[ii].numMatches.push(
            sar.sortingResults[ii].numMatches[jj]
          );
          sortingResults[ii].numFalsePositives.push(
            sar.sortingResults[ii].numFalsePositives[jj]
          );
          sortingResults[ii].numFalseNegatives.push(
            sar.sortingResults[ii].numFalseNegatives[jj]
          );
          sortingResults[ii].cpuTimesSec.push(
            sar.sortingResults[ii].cpuTimesSec[jj]
          );
        }
      }
    }
    return {
      studyName: sar.studyName,
      recordingName: recordingName,
      trueSnrs: trueSnrs,
      trueFiringRates: trueFiringRates,
      trueNumEvents: trueNumEvents,
      sortingResults: sortingResults
    };
  }

  aggregateStudyAnalysisResults(studySet) {
    let trueSnrs = [];
    let trueFiringRates = [];
    let trueNumEvents = [];
    // ...
    let sortingResults = [];
    let sorter_names = [];
    for (let sorter of this.props.sorters) {
      sorter_names.push(sorter.name);
    }
    sorter_names.sort();
    for (let sorter_name of sorter_names) {
      sortingResults.push({
        accuracies: [],
        precisions: [],
        recalls: [],
        numMatches: [],
        numFalsePositives: [],
        numFalseNegatives: [],
        cpuTimesSec: [],
        sorterName: sorter_name
      });
    }

    let studyNamesInStudySet = {};
    for (let study of studySet.studies) {
      studyNamesInStudySet[study.name] = true;
    }

    for (let studyAnalysisResult of this.props.studyAnalysisResults
      .allResults) {
      if (studyAnalysisResult.studyName in studyNamesInStudySet) {
        trueSnrs = trueSnrs.concat(studyAnalysisResult.trueSnrs);
        trueFiringRates = trueFiringRates.concat(
          studyAnalysisResult.trueFiringRates
        );
        trueNumEvents = trueNumEvents.concat(studyAnalysisResult.trueNumEvents);
        // ...
        for (let ii = 0; ii < sorter_names.length; ii++) {
          sortingResults[ii].accuracies = sortingResults[ii].accuracies.concat(
            studyAnalysisResult.sortingResults[ii].accuracies
          );
          sortingResults[ii].precisions = sortingResults[ii].precisions.concat(
            studyAnalysisResult.sortingResults[ii].precisions
          );
          sortingResults[ii].recalls = sortingResults[ii].recalls.concat(
            studyAnalysisResult.sortingResults[ii].recalls
          );
          sortingResults[ii].numMatches = sortingResults[ii].numMatches.concat(
            studyAnalysisResult.sortingResults[ii].numMatches
          );
          sortingResults[ii].numFalsePositives = sortingResults[
            ii
          ].numFalsePositives.concat(
            studyAnalysisResult.sortingResults[ii].numFalsePositives
          );
          sortingResults[ii].numFalseNegatives = sortingResults[
            ii
          ].numFalseNegatives.concat(
            studyAnalysisResult.sortingResults[ii].numFalseNegatives
          );
          sortingResults[ii].cpuTimesSec = sortingResults[
            ii
          ].cpuTimesSec.concat(
            studyAnalysisResult.sortingResults[ii].cpuTimesSec
          );
        }
      }
    }

    return {
      studySetName: studySet.name,
      trueSnrs: trueSnrs,
      trueFiringRates: trueFiringRates,
      trueNumEvents: trueNumEvents,
      // ...
      sortingResults: sortingResults
    };
  }

  computeEmptyTableRowCells(id) {
    let ret = [];
    ret.push({
      id: `${id}---`,
      text: "",
      spacer: true,
      selectable: false
    });
    let sorter_names = [];
    for (let sorter of this.props.sorters) {
      sorter_names.push(sorter.name);
    }
    sorter_names.sort();
    for (let ii = 0; ii < sorter_names.length; ii++) {
      ret.push({
        id: `${id}--${ii}`,
        text: "",
        spacer: true,
        selectable: false
      });
    }
    return ret;
  }

  computeTableRowCellsFromStudyAnalysisResult(studyAnalysisResult, opts) {
    let isStudySet = opts.isStudySet || false;
    let expandIdOnClick = opts.expandIdOnClick || null;

    // Compute the table row cells from a study (or for the aggregated results in a study set)
    let format = this.props.format;
    let metric = this.props.metric;
    let threshold = this.props.threshold;
    let ret = []; // the cells to return
    // the first cell is the name of the study
    let link;
    if (this.props.groupByStudySets) {
      // link = isStudySet ? `/studyset/${studyAnalysisResult.studyName}` : `/studyresults/${studyAnalysisResult.studyName}`;
      link = isStudySet
        ? null
        : `/studyresults/${studyAnalysisResult.studyName}`;
    } else if (studyAnalysisResult.recordingName) {
      link = `/recording/${studyAnalysisResult.studyName}/${
        studyAnalysisResult.recordingName
      }`;
    } else {
      // link = isStudySet ? `/studyset/${studyAnalysisResult.studyName}` : `/study/${studyAnalysisResult.studyName}`;
      link = isStudySet ? null : `/study/${studyAnalysisResult.studyName}`;
    }
    let name0, id0;
    if (this.props.groupByStudySets) {
      if (isStudySet) {
        name0 = studyAnalysisResult.studySetName;
        id0 = `study-set-${name0}`;
      } else {
        name0 = studyAnalysisResult.studyName;
        id0 = `study-${name0}`;
      }
    } else if (studyAnalysisResult.recordingName) {
      name0 = studyAnalysisResult.recordingName;
      id0 = `recording-${name0}`;
    } else {
      let studySetName = this.studySetNamesByStudyName[
        studyAnalysisResult.studyName
      ];
      if (studySetName)
        name0 = studySetName + "/" + studyAnalysisResult.studyName;
      else name0 = studyAnalysisResult.studyName;
      id0 = `study-name-${studyAnalysisResult.studyName}`;
    }
    ret.push({
      id: id0,
      text: name0,
      link: link,
      expand_id_on_click: expandIdOnClick,
      text_align: "right",
      selectable: false
    });
    let rowNormalize; // whether to normalize the rows
    switch (format) {
      case "count":
        rowNormalize = true;
        break;
      case "average":
        rowNormalize = false;
        break;
      default:
        rowNormalize = true;
    }

    let metricValueMatrix = [];
    studyAnalysisResult.sortingResults.forEach(sortingResult => {
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
      let metricValsCopy = [];
      for (let a of metricVals) metricValsCopy.push(a);
      metricValueMatrix.push(metricValsCopy);
    });
    if (this.props.imputeMissingValues) {
      imputeMissingValues(metricValueMatrix, { num_pls_components: 4 });
    }
    // here's where we can optionally impute the missing data in the metricValueMatrix

    let trueSnrs = studyAnalysisResult.trueSnrs;
    // loop through the sorting results for the study, and get the metrics (e.g., counts) to display
    let cellvalList = metricValueMatrix.map(function(metricVals, ii) {
      let sortingResult = studyAnalysisResult.sortingResults[ii];
      let num_found = 0;
      let num_missing = 0;
      for (let i = 0; i < trueSnrs.length; i++) {
        let val0 = sortingResult.accuracies[i];
        if (this.isNumeric(val0)) {
          num_found++;
        } else {
          num_missing++;
        }
      }
      if (num_found === 0)
        return { value: undefined, num_missing: num_missing };

      if (format === "count") {
        if (metricVals && metricVals.length > 0) {
          let numAbove = metricVals.filter(val => {
            return this.isNumeric(val) && val >= threshold; // metric threshold
          });
          return { value: numAbove.length, num_missing: num_missing };
        } else {
          return { value: undefined, num_missing: num_missing };
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
            let sum = 0;
            let count = 0;
            for (let i = 0; i < valsToUse.length; i++) {
              if (this.isNumeric(valsToUse[i])) {
                sum += valsToUse[i];
                count++;
              }
            }
            if (count === 0) {
              return { value: undefined, num_missing: num_missing };
            }
            aboveAvg = sum / count;
          } else {
            return { value: "N/A", num_missing: num_missing };
          }

          // This just prints the output to 2 digits
          let avgRounded = Math.round(aboveAvg * 100) / 100;
          return { value: avgRounded, num_missing: num_missing };
        } else {
          return { value: undefined, num_missing: num_missing };
        }
      } else if (format === "cpu") {
        if (metricVals && metricVals.length > 0) {
          let sum = 0;
          let count = 0;
          for (let i = 0; i < metricVals.length; i++) {
            if (this.isNumeric(metricVals[i])) {
              sum += metricVals[i];
              count++;
            }
          }
          if (count === 0) {
            return { value: undefined, num_missing: num_missing };
          }
          let avg = sum / count;
          let avgRounded = Math.round(avg);
          return {
            value: avgRounded,
            num_missing: num_missing,
            vals: metricVals
          };
        } else {
          return { value: undefined, num_missing: num_missing };
        }
      } else {
        Sentry.captureMessage(
          "Unsupported format in computeTableRowCellsFromStudyAnalysisResult",
          format
        );
        return { value: undefined, num_missing: num_missing };
      }
    }, this);

    let maxMetricVal = 0;
    cellvalList.forEach(x => {
      if (this.isNumeric(x.value) && x.value > maxMetricVal)
        maxMetricVal = x.value;
    });

    // For each result, we can now determine the color and text
    studyAnalysisResult.sortingResults.forEach(function(sortingResult, i) {
      let val0 = cellvalList[i].value;
      let text, color, bgcolor;
      if (val0 === undefined) {
        text = "";
        color = "black";
        bgcolor = "white";
      } else if (val0 === "N/A") {
        text = "N/A";
        color = "gray";
        bgcolor = "#f7f7f8";
      } else {
        text = val0;
        if (cellvalList[i].num_missing > 0) {
          if (this.props.imputeMissingValues) {
            text += "*";
          } else {
            text += "\u2020";
          }
        }
        if (rowNormalize && maxMetricVal) {
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
      let selected0, id0;
      if (studyAnalysisResult.recordingName) {
        selected0 =
          studyAnalysisResult.studyName === this.state.selectedStudyName &&
          sortingResult.sorterName === this.state.selectedSorterName &&
          studyAnalysisResult.recordingName.recordingName ===
            this.state.selectedRecordingName;
        id0 = `sorting-result-${studyAnalysisResult.studyName}---${
          studyAnalysisResult.recordingName
        }---${sortingResult.sorterName}`;
      } else {
        selected0 =
          studyAnalysisResult.studyName === this.state.selectedStudyName &&
          sortingResult.sorterName === this.state.selectedSorterName;
        id0 = `sorting-result-${studyAnalysisResult.studyName}---${
          sortingResult.sorterName
        }`;
      }
      ret.push({
        id: id0,
        expand_id_on_click: expandIdOnClick,
        color: color,
        bgcolor: bgcolor,
        text: text,
        vals: cellvalList[i].vals,
        border_left: true,
        border_right: true,
        text_align: "center",
        selectable: isStudySet ? false : true,
        selected: selected0,
        info: {
          studyAnalysisResult: studyAnalysisResult,
          sorterName: sortingResult.sorterName
        } // needed in onCellSelected -> selectStudyName, selectSorterName
      });
    }, this);
    return ret;
  }

  computeBackgroundColor(val) {
    let color;
    let square = Math.pow(val, 2);
    switch (this.props.format) {
      case "count":
        color = d3.interpolateGreens(square);
        break;
      case "average":
        color = d3.interpolateBlues(square);
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
    return val < 0.7 ? "black" : "white";
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  getAlertCopy() {
    return this.props.groupByStudySets && this.props.format === "cpu" ? (
      <p>
        <b>Note:</b> These numbers reflect actual compute times on our cluster
        and are not meant to be a rigorous benchmark. The algorithms were
        applied in batches, with many different algorithms possibly running
        simultaneously on the same machine. Some runs may have been allocated
        more CPU cores than others. We are working toward a more accurate
        compute time test.
      </p>
    ) : null;
  }

  getParaCopy() {
    const innercopy =
      this.props.format !== "cpu"
        ? "  Select individual cells to see a detailed scatterplot of the corresponding sorter results."
        : "";
    return this.props.groupByStudySets ? (
      <p className="updated updated__no-top">
        Click to expand study set rows and see component study data. {innercopy}
      </p>
    ) : (
      <p className="updated updated__no-top">{innercopy}</p>
    );
  }

  render() {
    console.log("💙", this.props);
    const loading =
      isEmpty(this.state.tableRows) || isEmpty(this.state.tableHeader);
    const title = this.getFormatCopy();
    const alertCopy = this.getAlertCopy();
    const paraCopy = this.getParaCopy();
    return (
      <div className="card card--spikeforest card--heatmap" id="heatmap-card">
        {this.props.showTitle ? (
          <div className="card__header">
            <h4 className="card__title">{title}</h4>
            <div className="card__subtitle">{paraCopy}</div>
          </div>
        ) : (
          <span />
        )}

        {loading ? (
          <h4>...</h4>
        ) : (
          <div className="heatmap__column">
            <ExpandingHeatmapTable
              header={this.state.tableHeader}
              rows={this.state.tableRows}
              onCellSelected={this.props.handleCellSelected}
            />
            <p>
              {this.props.imputeMissingValues
                ? "* Indicates an incomplete or failed sorting on a subset of results and quantities are computed from imputed values. N/A indicates that no ground-truth units were above the SNR threshold."
                : "\u2020 Indicates an incomplete or failed sorting on a subset of results. N/A indicates that no ground-truth units were above the SNR threshold."}
            </p>
            {alertCopy}
          </div>
        )}
      </div>
    );
  }
}

export default HeatmapViz;
