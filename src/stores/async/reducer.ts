import {
	Action,
	Types,
} from "./actions";
import { PENDING, SUCCESSFUL } from "./constants";
import { State } from "./State";
export default (state: State, action: Action) => {
	if (!state) {
		state = {};
	}
	switch (action.type) {
		case Types.FAIL: {
			const { error, key } = action.payload;
			return {
				...state,
				[key]: {
					error,
					"pending": false,
				}
			} as State;
		}
		case Types.START: {
			const { key } = action.payload;
			return {
				...state,
				[key]: PENDING,
			} as State;
		}
		case Types.SUCCEED: {
			const { key } = action.payload;
			return {
				...state,
				[key]: SUCCESSFUL,
			} as State;
		}
		default: {
			return state;
		}
	}
};
