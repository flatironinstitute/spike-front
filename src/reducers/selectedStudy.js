function selectedStudy(state = {}, action) {
  switch (action.type) {
    case "SELECT_STUDY":
      return action.studyId;
    default:
      return state;
  }
}

export default selectedStudy;
