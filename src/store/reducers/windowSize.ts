import { createSelector } from "reselect";
import { getWindowSize as getWindowSizeHelper } from "../../helpers/windowSize";
import {
	Action,
	Types,
} from "../actions/windowSize";
import { State as AppState } from "./";
export type State = [number, number];
export default (state: State, action: Action) => {
	if (action.type === Types.SET) {
		return action.payload;
	}
	if (!state) {
		return getWindowSizeHelper();
	}
	return state;
};
export const getWindowSize = (state: AppState) => state.windowSize || [undefined, undefined];
export const getWindowHeight = createSelector(
	getWindowSize,
	size => size[1],
);
export const getWindowWidth = createSelector(
	getWindowSize,
	size => size[0],
);
