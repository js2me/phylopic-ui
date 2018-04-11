import { combineReducers } from "redux";
import entities, { State as EntitiesState } from "./entities";
import lightbox, { State as LightboxState } from "./lightbox";
import search, { State as SearchState } from "./search";
export interface State {
	entities: EntitiesState;
	lightbox: LightboxState;
	search: SearchState;
}
export default combineReducers({
	entities,
	lightbox,
	search,
});
