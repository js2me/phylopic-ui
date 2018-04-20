import { createSelector } from "reselect";
import { State } from "../";
export const getWindowSize = (state: State) => state.windowSize || [undefined, undefined];
export const getWindowHeight = createSelector(
	getWindowSize,
	size => size[1],
);
export const getWindowWidth = createSelector(
	getWindowSize,
	size => size[0],
);
