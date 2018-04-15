import {
	Action,
	Types,
} from "../actions/entities";
import { Entity } from "../types/Entity";
import { State as AppState } from "./";
export type State = Readonly<Record<string, Entity>>;
export default (state: State, action: Action) => {
	if (!state) {
		state = {};
	}
	switch (action.type) {
		case Types.ADD: {
			const newState = { ...state };
			for (const entity of action.payload) {
				const { uid } = entity;
				const existing = state[uid];
				newState[uid] = existing ? { ...existing, ...entity } : entity;
			}
			return newState;
		}
		case Types.DELETE: {
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
// SELECTORS
export const getEntities = (state: AppState) => state.entities;
