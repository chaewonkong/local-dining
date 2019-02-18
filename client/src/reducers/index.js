import { combineReducers } from "redux";
import placeReducer from "./placeReducer";

export default combineReducers({
  place: placeReducer
});
