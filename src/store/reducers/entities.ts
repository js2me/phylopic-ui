import { Action } from "../actions/Action";
import {
	ADD_TO_LIST,
	AddToListPayload,
	CACHE_ENTITIES,
	CacheEntitiesPayload,
	CLEAR_LIST,
	ClearListPayload,
	SET_LIST_PROGRESS,
	SetListProgressPayload,
} from "../actions/entities";
import { Entity } from "../types/Entity";
import { ProgressiveList } from "../types/ProgressiveList";
export interface State {
	readonly byUID: {
		readonly [uid: string]: Readonly<Entity>;
	};
	readonly lists: {
		readonly [id: string]: Readonly<ProgressiveList>;
	};
}
const createProgressiveList: () => ProgressiveList = () => ({
	"progress": {
		"status": "pending",
	},
	"total": NaN,
	"uids": [],
});
export default (state: State, action: Action<{}>) => {
	if (!state) {
		state = {
			"byUID": {},
			"lists": {
				"browse": createProgressiveList(),
			},
		};
	}
	switch (action.type) {
		case ADD_TO_LIST: {
			const {
				entities,
				listID,
				start,
				total,
			} = action.payload as AddToListPayload;
			if (!entities || entities.length === 0) {
				return state;
			}
			const offset = start || 0;
			const { lists } = state;
			const list = lists[listID];
			const uids = [...list.uids];
			entities.forEach((entity, index) => uids[offset + index] = entity.uid);
			return {
				...state,
				"lists": {
					...lists,
					[listID]: {
						...list,
						"total": total === undefined ? list.total : total,
						uids,
					},
				}
			};
		}
		case CACHE_ENTITIES: {
			const { entities } = action.payload as CacheEntitiesPayload;
			if (!entities || !entities.length) {
				return state;
			}
			const byUID: {
				[uid: string]: Entity;
			} = {...state.byUID};
			entities.forEach(entity => {
				const { uid } = entity;
				const existing = byUID[uid];
				byUID[uid] = existing ? {...existing, ...entity} : entity;
			});
			return {
				...state,
				byUID,
			};
		}
		case CLEAR_LIST: {
			const { listID, start } = action.payload as ClearListPayload;
			const { lists } = state;
			const list = lists[listID];
			const uids = list.uids.slice(0, start || 0);
			return {
				...state,
				"lists": {
					...lists,
					[listID]: {
						...list,
						uids,
					},
				},
			};
		}
		case SET_LIST_PROGRESS: {
			const { listID, progress } = action.payload as SetListProgressPayload;
			const { lists } = state;
			const list = lists[listID];
			return {
				...state,
				"lists": {
					...lists,
					[listID]: {
						...list,
						progress,
					},
				},
			};
		}
		default: {
			return state;
		}
	}
};
