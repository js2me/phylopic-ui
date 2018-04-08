import { combineReducers } from "redux";
import entities, { State as EntititesState } from "./entities";
export interface State {
	entities: EntititesState;
}
export default combineReducers({
	entities,
});
