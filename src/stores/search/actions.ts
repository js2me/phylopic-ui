
import { Dispatch } from "redux";
import { State } from "../";
import { addEntities, Entity } from "../entities";
import { Params } from "./Params";
export enum Types {
	APPEND_UIDS = "search/APPEND_UIDS",
	SET_PARAMS = "search/SET_PARAMS",
	SET_TOTAL = "search/SET_TOTAL",
}
export const appendUIDs = <T>(payload: {
	key: string;
	uids: ReadonlyArray<string>;
}) => ({
	payload,
	"type": Types.APPEND_UIDS as Types.APPEND_UIDS,
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
export const appendSearchEntities = <T>(payload: Readonly<{
	entities: ReadonlyArray<Entity & Partial<T>>;
	key: string;
	total: number;
}>) => (dispatch: Dispatch<State>) => {
	const { entities, key, total } = payload;
	dispatch(addEntities(entities));
	dispatch(setTotal({ key, total }));
	dispatch(appendUIDs({
		key,
		"uids": entities.map(entity => entity.uid),
	}));
};
export type Action = ReturnType<typeof appendUIDs>
	| ReturnType<typeof setParams>
	| ReturnType<typeof setTotal>;
