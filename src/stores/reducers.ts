import { combineReducers } from "redux";
import asyncReducer from "./async";
import entities from "./entities";
import lightbox from "./lightbox";
import searches from "./searches";
import selections from "./selections";
import windowSize from "./windowSize";
export default combineReducers({
	"async": asyncReducer,
	entities,
	lightbox,
	searches,
	selections,
	windowSize,
});
