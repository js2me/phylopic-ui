import { createSelector } from "reselect";
import { State as AppState } from "../";
import { getEntityMap } from "../entities";
import { Entity } from "../entities/Entity";
import { Image } from "../entities/Image";
import { Name } from "../entities/Name";
const getImageUID = (state: AppState) => state.lightbox.imageUID;
export const getImage = createSelector(
	getEntityMap,
	getImageUID,
	(entities, uid) => uid ? entities[uid] as Readonly<Entity & Partial<Image>> | undefined : undefined,
);
const getNameUIDs = createSelector(
	getImage,
	image => (image ? image.name_uids : null) || [],
);
export const getNames = createSelector(
	getEntityMap,
	getNameUIDs,
	(entities, uids) => uids.map(uid => entities[uid] as Readonly<Entity & Partial<Name>> | undefined),
);
