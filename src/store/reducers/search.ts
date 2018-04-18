import { createSelector } from "reselect";
import {
	Action,
	Types,
} from "../actions/search";
import { Entity } from "../types/Entity";
import { Filter, Search } from "../types/Search";
import { State as AppState } from "./";
import { getEntities as getAllEntities } from "./entities";
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
// SELECTORS
const getUIDs = (key: string) => (state: AppState) => (state.search[key] ? state.search[key].uids : null) || [];
export const getEntities = <T>(key: string) => createSelector(
	getAllEntities,
	getUIDs(key),
	(entities, uids) => uids.map(uid => entities[uid] as Readonly<Entity & Partial<T>>),
);
export const getTotal = (key: string) => (state: AppState) => state.search[key] ? state.search[key].total : NaN;
