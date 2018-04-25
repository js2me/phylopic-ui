import {
	Action,
	Types,
} from "./actions";
import { State } from "./State";
export default (state: State, action: Action) => {
	if (!state) {
		state = {};
	}
	switch (action.type) {
		case Types.SET: {
			const { key, uids } = action.payload;
			return {
				...state,
				[key]: uids,
			} as State;
		}
		default: {
			return state;
		}
	}
};
