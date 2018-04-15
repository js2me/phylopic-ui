import { createSelector } from "reselect";
import {
	Action,
	Types,
} from "../actions/lightbox";
import { Entity } from "../types/Entity";
import { Image } from "../types/Image";
import { Name } from "../types/Name";
import { Progress } from "../types/Progress";
export interface State {
	readonly imageUID: string | null;
	readonly progress: Readonly<Progress>;
}
import { State as AppState } from "./";
import { getEntities } from "./entities";
export default (state: State, action: Action) => {
	if (action.type === Types.SET) {
		return action.payload;
	}
	if (!state) {
		return {
			"imageUID": null,
			"progress": {
				"error": null,
				"pending": false,
			}
		};
	}
	return state;
};
// SELECTORS
const getImageUID = (state: AppState) => state.lightbox.imageUID;
export const getImage = createSelector(
	getEntities,
	getImageUID,
	(entities, uid) => uid ? entities[uid] as Readonly<Entity & Partial<Image>> | undefined : null,
);
const getNameUIDs = createSelector(
	getImage,
	image => (image ? image.name_uids : null) || [],
);
export const getNames = createSelector(
	getEntities,
	getNameUIDs,
	(entities, uids) => uids.map(uid => entities[uid] as Readonly<Entity & Partial<Name>>),
);
