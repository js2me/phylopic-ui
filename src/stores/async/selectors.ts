import { createSelector } from "reselect";
import { State } from "../";
import { SUCCESSFUL } from "./constants";
import { Progress } from "./Progress";
const getAsync = (state: State) => state.async;
export const getProgress = (key: string | null) => createSelector(
	getAsync,
	state => key ? state[key] as Progress || SUCCESSFUL : SUCCESSFUL,
);
export const failed = (key: string | null) => createSelector(
	getProgress(key),
	progress => !progress.pending && Boolean(progress.error),
);
export const getError = (key: string | null) => createSelector(
	getProgress(key),
	progress => progress.error,
);
export const isPending = (key: string | null) => createSelector(
	getProgress(key),
	progress => progress.pending,
);
export const succeeded = (key: string | null) => createSelector(
	getProgress(key),
	progress => !progress.pending && !progress.error,
);
