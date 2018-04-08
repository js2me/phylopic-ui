import { combineReducers } from "redux";
import entities, { State as EntitiesState } from "./entities";
import lightbox, { State as LightboxState } from "./lightbox";
export interface State {
	entities: EntitiesState;
	lightbox: LightboxState;
}
export default combineReducers({
	entities,
	lightbox,
});
