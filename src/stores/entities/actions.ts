import { Dispatch } from "redux";
import { State } from "../State";
import { Entity } from "./Entity";
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
export function getEntities<T>(payload: Iterable<string>):
	(dispatch: Dispatch<State>, getState: () => State) => ReadonlySet<EntityElement<T>>;
export function getEntities<T>(payload: ReadonlyArray<string>):
	(dispatch: Dispatch<State>, getState: () => State) => ReadonlyArray<EntityElement<T>>;
export function getEntities<T>(payload: Iterable<string>) {
	return (dispatch: Dispatch<State>, getState: () => State) => {
		const { entities } = getState();
		if (Array.isArray(payload)) {
			return payload
				.map(uid => entities[uid]) as ReadonlyArray<EntityElement<T>>;
		}
		const set = new Set<EntityElement<T>>();
		for (const uid of payload) {
			set.add(entities[uid] as EntityElement<T>);
		}
		return set as ReadonlySet<EntityElement<T>>;
	};
}
export type Action = ReturnType<typeof addEntities>
	| ReturnType<typeof deleteEntities>;
