// A reducer takes in two things:
// 1. the action (info about what happened)
// 2. Copy of the current state

function selectedSorter(state = [], action) {
  console.log(state, action);
  return state;
}

export default selectedSorter;
