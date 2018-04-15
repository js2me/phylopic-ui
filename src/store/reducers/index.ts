import { combineReducers } from "redux";
import entities, { State as EntitiesState } from "./entities";
import lightbox, { State as LightboxState } from "./lightbox";
import search, { State as SearchState } from "./search";
import windowSize, { State as WindowSizeState } from "./windowSize";
export interface State {
	entities: EntitiesState;
	lightbox: LightboxState;
	search: SearchState;
	windowSize: WindowSizeState;
}
export default combineReducers({
	entities,
	lightbox,
	search,
	windowSize,
});
