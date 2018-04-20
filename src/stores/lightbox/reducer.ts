import {
	Action,
	Types,
} from "./actions";
import { State } from "./State";
export default (state: State, action: Action) => {
	if (action.type === Types.SET) {
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
