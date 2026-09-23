const data = require("../data");

// Average CPU time grouped by sorter, then by study
// (formerly a mongo aggregation pipeline)
function computeCPUsByStudyAndSorter(sortingResults) {
  const groups = {};
  sortingResults.forEach(sr => {
    if (typeof sr.cpuTimeSec !== "number") return;
    const bySorter = (groups[sr.sorterName] = groups[sr.sorterName] || {});
    const g = (bySorter[sr.studyName] = bySorter[sr.studyName] || {
      total: 0,
      count: 0
    });
    g.total += sr.cpuTimeSec;
    g.count += 1;
  });
  return Object.keys(groups).map(sorterName => ({
    _id: sorterName,
    studyGroup: Object.keys(groups[sorterName]).map(studyName => {
      const g = groups[sorterName][studyName];
      const averageCPU = g.total / g.count;
      return {
        count: g.count,
        studyName: studyName,
        averageCPU: averageCPU,
        x: studyName,
        y: averageCPU
      };
    })
  }));
}

const cpus = computeCPUsByStudyAndSorter(data.sortingResults);
const totalCPU = data.sortingResults.reduce(
  (sum, sr) => sum + (typeof sr.cpuTimeSec === "number" ? sr.cpuTimeSec : 0),
  0
);

exports.getSortingResults = async (req, res) => {
  res.send(data.sortingResults);
};

exports.getCPUs = async (req, res, next) => {
  res.send({ cpus: cpus });
};

exports.getStats = async (req, res, next) => {
  res.send({ cpus: totalCPU, groundTruth: 0 });
};
