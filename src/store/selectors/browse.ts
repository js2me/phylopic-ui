import { createSelector } from "reselect";
import { State } from "../reducers";
import { Entity } from "../types/Entity";
import { Image } from "../types/Image";
import { entitiesSelector } from "./entities";
const imageUIDsSelector = (state: State) => (state.search.browse ? state.search.browse.uids : null) || [];
export const imagesSelector = createSelector(
	entitiesSelector,
	imageUIDsSelector,
	(entities, uids) => uids.map(uid => entities[uid] as Readonly<Entity & Partial<Image>>),
);
