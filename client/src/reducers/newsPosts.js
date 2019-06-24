import { RECEIVE_NEWS_POSTS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const newsPosts = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_NEWS_POSTS:
      return action.newsPosts;
    default:
      return state;
  }
};

export default newsPosts;
