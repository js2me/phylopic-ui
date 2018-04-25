import { createSelector } from "reselect";
import { State } from "../";
import { Entity, getEntityMap } from "../entities";
const getUIDs = (key: string) => (state: State) => state.selections[key] || new Array<string>();
export const countEntities = (key: string) => createSelector(
	getUIDs(key),
	uids => uids.length,
);
export const getEntities = <T>(key: string) => createSelector(
	getEntityMap,
	getUIDs(key),
	(entities, uids) => uids.map(uid => entities[uid] as Readonly<Entity & Partial<T>>),
);
