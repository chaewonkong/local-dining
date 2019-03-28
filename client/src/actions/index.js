import { FETCH_LIST, ADD_PLACE } from "./types";

export const updateList = places => ({
  type: FETCH_LIST,
  payload: places
});

export const addPlace = (place, type) => ({
  type: ADD_PLACE,
  payload: { place, type }
});
