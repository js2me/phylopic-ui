import { Action } from "../actions/Action";
import {
	ADD_TO_LIST,
	AddToListPayload,
	CACHE_ENTITIES,
	CacheEntitiesPayload,
	CLEAR_LIST,
	ClearListPayload,
} from "../actions/entities";
import { Entity } from "../types/Entity";
import { State } from "../types/State";
export default (state: State, action: Action<{}>) => {
	switch (action.type) {
		case ADD_TO_LIST: {
			const { entities, listID, start } = (action as Action<AddToListPayload>).payload;
			if (!entities || entities.length === 0) {
				return state;
			}
			const offset = start || 0;
			const list = state.entityLists[listID];
			const uids = [...list.uids];
			entities.forEach((entity, index) => uids[offset + index] = entity.uid);
			return {
				...state,
				"entityLists": {
					...state.entityLists,
					[listID]: {
						uids,
						...list,
					},
				},
			};
		}
		case CACHE_ENTITIES: {
			const { entities } = (action as Action<CacheEntitiesPayload>).payload;
			if (!entities || !entities.length) {
				return state;
			}
			const entitiesByUID: {
				[uid: string]: Entity;
			} = {...state.entitiesByUID};
			entities.forEach(entity => {
				const { uid } = entity;
				const existing = entitiesByUID[uid];
				entitiesByUID[uid] = existing ? {...existing, ...entity} : entity;
			});
			return {
				entitiesByUID,
				...state,
			};
		}
		case CLEAR_LIST: {
			const { listID, start } = (action as Action<ClearListPayload>).payload;
			const list = state.entityLists[listID];
			const uids = list.uids.slice(0, start || 0);
			return {
				...state,
				"entityLists": {
					...state.entityLists,
					[listID]: {
						uids,
						...list,
					},
				},
			};
		}
		default: {
			return state;
		}
	}
};
