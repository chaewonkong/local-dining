import { FETCH_LIST, ADD_PLACE } from "../actions/types";

export const places = (state = [], action) => {
  if (action.type === FETCH_LIST) return action.payload || null;
  else return state;
};

export const newPlace = (state = {}, action) => {
  if (action.type === ADD_PLACE) return action.payload;
  else return state;
};
