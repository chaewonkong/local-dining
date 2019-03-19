import { FETCH_LIST } from "./types";

export const updateList = places => ({
  type: FETCH_LIST,
  payload: places
});
