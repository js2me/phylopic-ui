import {
	Action,
	Types,
} from "../actions/entities";
import { Entity } from "../types/Entity";
export type State = Readonly<Record<string, Entity>>;
export default (state: State, action: Action) => {
	if (!state) {
		state = {};
	}
	switch (action.type) {
		case Types.ENTITIES_ADD: {
			const newState = { ...state };
			for (const entity of action.payload) {
				const { uid } = entity;
				const existing = state[uid];
				newState[uid] = existing ? { ...existing, ...entity } : entity;
			}
			return newState;
		}
		case Types.ENTITIES_DELETE: {
			const newState = { ...state };
			for (const uid of action.payload) {
				delete newState[uid];
			}
			return newState;
		}
		default: {
			return state;
		}
	}
};
