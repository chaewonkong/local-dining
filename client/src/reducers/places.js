import {
  FETCH_LIST,
  SEARCH,
  ADD_DETAIL,
  PLACE_LIST,
  ADD_SUCCESS
} from "../actions/types";

export const places = (state = [], action) => {
  if (action.type === FETCH_LIST) return action.payload || null;
  else return state;
};

// export const newPlace = (state = {}, action) => {
//   if (action.type === ADD_PLACE) return action.payload;
//   else return state;
// };

export const newPlace = (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
      return { type: action.type };
    case ADD_DETAIL:
      return { type: action.type, place: action.payload };
    case PLACE_LIST:
      return { type: action.type, place: action.payload };
    case ADD_SUCCESS:
      return {
        type: action.type,
        place: { name: "", address: "", category: "", lat: "", lng: "" }
      };
    default:
      return state;
  }
};
