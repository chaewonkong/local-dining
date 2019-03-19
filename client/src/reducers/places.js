import { FETCH_LIST } from "../actions/types";

const places = (state = [], action) => {
  switch (action.type) {
    case FETCH_LIST:
      return action.payload || null;
    default:
      return state;
  }
};

export default places;
