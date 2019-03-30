import { FETCH_LIST } from "./types";

export const updateList = places => ({
  type: FETCH_LIST,
  payload: places
});

export const addPlace = (place, type) => ({
  type,
  payload: { ...place }
});
