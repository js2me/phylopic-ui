import {
	Action,
	Types,
} from "../actions/lightbox";
import { Progress } from "../types/Progress";
export interface State {
	readonly imageUID: string | null;
	readonly progress: Readonly<Progress>;
}
export default (state: State, action: Action) => {
	if (action.type === Types.SET_LIGHTBOX) {
		return action.payload;
	}
	if (!state) {
		return {
			"imageUID": null,
			"progress": {
				"error": null,
				"pending": false,
			}
		};
	}
	return state;
};
