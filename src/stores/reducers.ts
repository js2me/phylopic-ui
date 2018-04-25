import { combineReducers } from "redux";
import asyncReducer from "./async";
import entities from "./entities";
import lightbox from "./lightbox";
import search from "./searches";
import windowSize from "./windowSize";
export default combineReducers({
	"async": asyncReducer,
	entities,
	lightbox,
	search,
	windowSize,
});
