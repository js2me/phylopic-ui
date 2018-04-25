import { createSelector } from "reselect";
import { State } from "../";
import { Entity, getEntityMap } from "../entities";
const getUIDs = (key: string) => (state: State) => (state.search[key] ? state.search[key].uids : null) || [];
export const countEntities = (key: string) => createSelector(
	getUIDs(key),
	uids => uids.length,
);
export const getEntities = <T>(key: string) => createSelector(
	getEntityMap,
	getUIDs(key),
	(entities, uids) => uids.map(uid => entities[uid] as Readonly<Entity & Partial<T>>),
);
export const getTotal = (key: string) => (state: State) => state.search[key] ? state.search[key].total : NaN;
