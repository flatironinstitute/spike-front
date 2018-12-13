function selectedStudy(state = {}, action) {
  switch (action.type) {
    case "SELECT_STUDY":
      console.log("selecting study", state, action);
      return action.studyId;
    default:
      return state;
  }
}

export default selectedStudy;
