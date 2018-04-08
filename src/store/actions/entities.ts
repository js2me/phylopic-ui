import { Dispatch } from "redux";
import { Entity } from "../types/Entity";
import { Progress } from "../types/Progress";
export const ADD_TO_LIST = "ADD_TO_LIST";
export const CACHE_ENTITIES = "CACHE_ENTITIES";
export const CLEAR_LIST = "CLEAR_LIST";
export const SET_LIST_PROGRESS = "SET_LIST_PROGRESS";
export const SET_LIST_TOTAL = "SET_LIST_TOTAL";
import { State } from "../reducers";
export interface AddToListPayload {
	entities: Entity[];
	listID: string;
	start: number;
	total?: number;
}
export interface CacheEntitiesPayload {
	entities: Entity[];
}
export interface ClearListPayload {
	listID: string;
	start?: number;
}
export interface SetListProgressPayload {
	listID: string;
	progress: Progress;
}
export interface SetListTotalPayload {
	listID: string;
	total: number;
}
export const cacheEntities = (payload: CacheEntitiesPayload) => ({
	payload,
	"type": CACHE_ENTITIES,
});
export const addToList = (payload: AddToListPayload) => (dispatch: Dispatch<State>) => {
	const { entities } = payload;
	dispatch(cacheEntities({ entities }));
	return dispatch({
		payload,
		"type": ADD_TO_LIST,
	});
};
export const clearList = (payload: ClearListPayload) => ({
	payload,
	"type": CLEAR_LIST,
});
export const setListProgress = (payload: SetListProgressPayload) => ({
	payload,
	"type": SET_LIST_PROGRESS,
});
export const setListTotal = (payload: SetListTotalPayload) => ({
	payload,
	"type": SET_LIST_TOTAL,
});
