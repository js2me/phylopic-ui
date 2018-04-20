import {
	Action,
	Types,
} from "./actions";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { State } from "./State";
const createSearch = <T>() => ({
	"error": null,
	"fields": new Set<keyof T>(),
	"filters": new Set<Filter<T, keyof T>>(),
	"pending": false,
	"sort": [],
	"total": NaN,
	"uids": [],
} as Search<T>);
export default (state: State, action: Action) => {
	if (!state) {
		state = {};
	}
	switch (action.type) {
		case Types.FAIL: {
			const { error, key } = action.payload;
			const previous = state[key] || createSearch();
			return {
				...state,
				[action.payload.key]: {
					...previous,
					error,
					"pending": false,
				}
			} as State;
		}
		case Types.RESET: {
			const { key } = action.payload;
			const previous = state[key] || createSearch();
			return {
				...state,
				[action.payload.key]: {
					...previous,
					"pending": false,
					"uids": [],
				}
			} as State;
		}
		case Types.START: {
			const { key } = action.payload;
			const previous = state[key] || createSearch();
			return {
				...state,
				[action.payload.key]: {
					...previous,
					"error": null,
					"pending": true,
				}
			} as State;
		}
		case Types.SUCCEED: {
			const { key, total, uids } = action.payload;
			const previous = state[key] || createSearch();
			return {
				...state,
				[action.payload.key]: {
					...previous,
					"pending": false,
					total,
					"uids": [...previous.uids, ...uids],
				}
			} as State;
		}
		case Types.UPDATE: {
			const { fields, filters, key, sort } = action.payload;
			const previous = state[key] || createSearch();
			return {
				...state,
				[action.payload.key]: {
					...previous,
					"fields": fields || previous.fields,
					"filters": filters || previous.filters,
					"sort": sort || previous.sort,
				}
			} as State;
		}
		default: {
			return state;
		}
	}
};
