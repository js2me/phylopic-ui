import {
	Action,
	Types,
} from "./actions";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { State } from "./State";
const createSearch = <T>() => ({
	"params": {
		"fields": new Set<keyof T>(),
		"filters": new Set<Filter<T, keyof T>>(),
		"sort": [],
	},
	"total": NaN,
	"uids": [],
} as Search<T>);
export default (state: State, action: Action) => {
	if (!state) {
		state = {};
	}
	switch (action.type) {
		case Types.APPEND_UIDS: {
			const { key, uids } = action.payload;
			const previous = state[key] || createSearch();
			return {
				...state,
				[key]: {
					...previous,
					"uids": [...previous.uids, ...uids],
				},
			} as State;
		}
		case Types.SET_TOTAL: {
			const { key, total } = action.payload;
			const previous = state[key] || createSearch();
			return {
				...state,
				[key]: {
					...previous,
					total,
				},
			} as State;
		}
		case Types.SET_PARAMS: {
			const { key, params: newParams } = action.payload;
			const { params: oldParams } = state[key] || createSearch();
			const params = {
				"fields": newParams.fields || oldParams.fields,
				"filters": newParams.filters || oldParams.filters,
				"sort": newParams.sort || oldParams.sort,
			};
			// :TODO: Check if actually different?
			return {
				...state,
				[key]: {
					params,
					"total": NaN,
					"uids": [],
				}
			} as State;
		}
		default: {
			return state;
		}
	}
};
