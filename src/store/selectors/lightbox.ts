import { createSelector } from "reselect";
import { State } from "../reducers";
import { Entity } from "../types/Entity";
import { Image } from "../types/Image";
import { Name } from "../types/Name";
import { entitiesSelector } from "./entities";
const imageUIDSelector = (state: State) => state.lightbox.imageUID;
export const imageSelector = createSelector(
	entitiesSelector,
	imageUIDSelector,
	(entities, uid) => uid ? entities[uid] as Readonly<Entity & Partial<Image>> | undefined : null,
);
const nameUIDsSelector = createSelector(
	imageSelector,
	image => (image ? image.name_uids : null) || [],
);
export const namesSelector = createSelector(
	entitiesSelector,
	nameUIDsSelector,
	(entities, uids) => uids.map(uid => entities[uid] as Readonly<Entity & Partial<Name>>),
);
