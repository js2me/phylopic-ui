import { combineReducers } from "redux";
import entities from "./entities";
import lightbox from "./lightbox";
import search from "./search";
import windowSize from "./windowSize";
export default combineReducers({
	entities,
	lightbox,
	search,
	windowSize,
});
