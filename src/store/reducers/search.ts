import {
	Action,
	Types,
} from "../actions/search";
import { Filter, Search } from "../types/Search";
export type State = Readonly<Record<string, Readonly<Search<{}>>>>;
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
		case Types.SEARCH_FAIL: {
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
		case Types.SEARCH_RESET: {
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
		case Types.SEARCH_START: {
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
		case Types.SEARCH_SUCCEED: {
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
		case Types.SEARCH_UPDATE: {
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
