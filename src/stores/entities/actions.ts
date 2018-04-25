import { Dispatch } from "redux";
import { State } from "../State";
import { Entity } from "./Entity";
import { getEntityMap } from "./selectors";
export enum Types {
	ADD = "entities/ADD",
	DELETE = "entities/DELETE",
}
type EntityElement<T> = (Entity & Partial<T>) | undefined;
export const addEntities = (payload: Iterable<Entity>) => ({
	payload,
	"type": Types.ADD as Types.ADD,
});
export const deleteEntities = (payload: Iterable<string>) => ({
	payload,
	"type": Types.DELETE as Types.DELETE,
});
export function fetchEntities<T>(payload: {
	fields: ReadonlySet<keyof T>;
	uids: ReadonlySet<string>;
}) {
	const { fields, uids } = payload;
	return async(dispatch: Dispatch<State>, getState: () => State) => {
		if (!fields.size || !uids.size) {
			return;
		}
		// :TODO:
		return;
	};
}
export function getEntities<T>(payload: {
	fields?: ReadonlySet<keyof T>;
	uids: Iterable<string>;
}): (dispatch: Dispatch<State>, getState: () => State) => Promise<ReadonlySet<EntityElement<T>>>;
export function getEntities<T>(payload: {
	fields?: ReadonlySet<keyof T>;
	uids: ReadonlyArray<string>;
}): (dispatch: Dispatch<State>, getState: () => State) => Promise<ReadonlyArray<EntityElement<T>>>;
export function getEntities<T>(payload: {
	fields?: ReadonlySet<keyof T>;
	uids: Iterable<string>;
}) {
	const { fields, uids } = payload;
	return async(dispatch: Dispatch<State>, getState: () => State) => {
		const entities = getEntityMap(getState());
		if (fields !== undefined && fields.size) {
			const fieldsToFetch = new Set<keyof T>();
			const uidsToFetch = new Set<string>();
			for (const uid of uids) {
				const entity = entities[uid] as EntityElement<T>;
				if (entity === undefined) {
					uidsToFetch.add(uid);
					for (const field of fields) {
						fieldsToFetch.add(field);
					}
				} else {
					for (const field of fields) {
						if (entity[field] === undefined) {
							uidsToFetch.add(uid);
							fieldsToFetch.add(field);
						}
					}
				}
			}
			await dispatch(fetchEntities({
				"fields": fieldsToFetch,
				"uids": uidsToFetch,
			}));
		}
		if (Array.isArray(uids)) {
			return (uids as string[])
				.map(uid => entities[uid]) as ReadonlyArray<EntityElement<T>>;
		}
		const set = new Set<EntityElement<T>>();
		for (const uid of uids) {
			set.add(entities[uid] as EntityElement<T>);
		}
		return set as ReadonlySet<EntityElement<T>>;
	};
}
export type Action = ReturnType<typeof addEntities>
	| ReturnType<typeof deleteEntities>;
