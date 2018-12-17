// select study
// TODO: should I use name or set an iD?
export function selectStudy(studyId) {
  return {
    type: "SELECT_STUDY",
    studyId
  };
}
// select sorter
export function selectSorter(sorterId) {
  return {
    type: "SELECT_SORTER",
    sorterId
  };
}

// TODO: Can I use a blank sorter/study ID to make this work instead of functions? 🤔
// deselect study
export function deselectStudy() {
  return {
    type: "DESELECT_STUDY"
  };
}

// deselect sorter
export function deselectSorter() {
  return {
    type: "DESELECT_SORTER"
  };
}
