
import { Dispatch } from "redux";
import { State } from "../";
import { addEntities, Entity } from "../entities";
import { Params } from "./Params";
export enum Types {
	INSERT_UIDS = "search/INSERT_UIDS",
	SET_PARAMS = "search/SET_PARAMS",
	SET_TOTAL = "search/SET_TOTAL",
}
export const insertUIDs = <T>(payload: {
	key: string;
	start: number,
	uids: ReadonlyArray<string>;
}) => ({
	payload,
	"type": Types.INSERT_UIDS as Types.INSERT_UIDS,
});
export const setParams = <T>(payload: {
	key: string;
	params: Partial<Params<T>>,
}) => ({
	payload,
	"type": Types.SET_PARAMS as Types.SET_PARAMS,
});
export const setTotal = <T>(payload: {
	key: string;
	total: number;
}) => ({
	payload,
	"type": Types.SET_TOTAL as Types.SET_TOTAL,
});
export const insertEntities = <T>(payload: Readonly<{
	entities: ReadonlyArray<Entity & Partial<T>>;
	key: string;
	start: number;
	total?: number;
}>) => (dispatch: Dispatch<State>) => {
	const { entities, key, start, total } = payload;
	dispatch(addEntities(entities));
	if (total !== undefined) {
		dispatch(setTotal({ key, total }));
	}
	dispatch(insertUIDs({
		key,
		start,
		"uids": entities.map(entity => entity.uid),
	}));
};
export type Action = ReturnType<typeof insertUIDs>
	| ReturnType<typeof setParams>
	| ReturnType<typeof setTotal>;
