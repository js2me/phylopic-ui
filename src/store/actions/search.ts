import { Dispatch } from "redux";
import { State } from "../reducers";
import { Entity } from "../types/Entity";
import { Filter, Sort } from "../types/Search";
import { addEntities } from "./entities";
export enum Types {
	SEARCH_FAIL = "SEARCH_FAIL",
	SEARCH_RESET = "SEARCH_RESET",
	SEARCH_START = "SEARCH_START",
	SEARCH_SUCCEED = "SEARCH_SUCCEED",
	SEARCH_UPDATE = "SEARCH_UPDATE",
}
export const failSearch = (payload: {
	error: Error;
	key: string;
}) => ({
	payload,
	"type": Types.SEARCH_FAIL as Types.SEARCH_FAIL,
});
export const resetSearch = (payload: { key: string; }) => ({
	payload,
	"type": Types.SEARCH_RESET as Types.SEARCH_RESET,
});
export const startSearch = (payload: { key: string; }) => ({
	payload,
	"type": Types.SEARCH_START as Types.SEARCH_START,
});
export const succeedSearch = (payload: {
	key: string;
	total: number;
	uids: string[];
}) => ({
	payload,
	"type": Types.SEARCH_SUCCEED as Types.SEARCH_SUCCEED,
});
export const updateSearch = <T>(payload: {
	key: string;
	fields?: Set<keyof T>;
	filters?: Set<Filter<T, keyof T>>;
	sort?: Array<Sort<T>>;
}) => ({
	payload,
	"type": Types.SEARCH_UPDATE as Types.SEARCH_UPDATE,
});
export const completeSearch = <T>(payload: {
	entities: Array<Entity & Partial<T>>;
	key: string;
	total: number;
}) => (dispatch: Dispatch<State>, getState: () => State) => {
	const { entities, key, total } = payload;
	dispatch(addEntities(entities));
	dispatch(succeedSearch({
		key,
		total,
		"uids": entities.map(entity => entity.uid),
	}));
};
export type Action = ReturnType<typeof failSearch>
	| ReturnType<typeof resetSearch>
	| ReturnType<typeof startSearch>
	| ReturnType<typeof succeedSearch>
	| ReturnType<typeof updateSearch>;
