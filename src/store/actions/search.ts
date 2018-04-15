import { Dispatch } from "redux";
import { State } from "../reducers";
import { Entity } from "../types/Entity";
import { Filter, Sort } from "../types/Search";
import { addEntities } from "./entities";
export enum Types {
	FAIL = "search/FAIL",
	RESET = "search/RESET",
	START = "search/START",
	SUCCEED = "search/SUCCEED",
	UPDATE = "search/UPDATE",
}
export const failSearch = (payload: {
	error: Error;
	key: string;
}) => ({
	payload,
	"type": Types.FAIL as Types.FAIL,
});
export const resetSearch = (payload: { key: string; }) => ({
	payload,
	"type": Types.RESET as Types.RESET,
});
export const startSearch = (payload: { key: string; }) => ({
	payload,
	"type": Types.START as Types.START,
});
export const succeedSearch = (payload: {
	key: string;
	total: number;
	uids: string[];
}) => ({
	payload,
	"type": Types.SUCCEED as Types.SUCCEED,
});
export const updateSearch = <T>(payload: {
	key: string;
	fields?: Set<keyof T>;
	filters?: Set<Filter<T, keyof T>>;
	sort?: Array<Sort<T>>;
}) => ({
	payload,
	"type": Types.UPDATE as Types.UPDATE,
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
