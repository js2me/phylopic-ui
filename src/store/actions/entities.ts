import { Dispatch } from "redux";
import { State } from "../reducers";
import { Entity } from "../types/Entity";
export enum Types {
	ENTITIES_ADD = "ENTITIES_ADD",
	ENTITIES_DELETE = "ENTITIES_DELETE",
}
export const addEntities = (payload: Iterable<Entity>) => ({
	payload,
	"type": Types.ENTITIES_ADD as Types.ENTITIES_ADD,
});
export const deleteEntities = (payload: Iterable<string>) => ({
	payload,
	"type": Types.ENTITIES_DELETE as Types.ENTITIES_DELETE,
});
export const getEntities = <T>(payload: Iterable<string>) =>
	(dispatch: Dispatch<State>, getState: () => State) => {
		const { entities } = getState();
		if (Array.isArray(payload)) {
			return payload
				.map(uid => entities[uid] as Entity & Partial<T>);
		}
		const set = new Set<Entity & Partial<T>>();
		for (const uid of payload) {
			set.add(entities[uid] as Entity & Partial<T>);
		}
		return set;
	};
export type Action = ReturnType<typeof addEntities>
	| ReturnType<typeof deleteEntities>;
