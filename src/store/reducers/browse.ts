import { createSelector } from "reselect";
import { Entity } from "../types/Entity";
import { Image } from "../types/Image";
import { State } from "./";
import { getEntities } from "./entities";
// SELECTORS
const getImageUIDs = (state: State) => (state.search.browse ? state.search.browse.uids : null) || [];
export const getImages = createSelector(
	getEntities,
	getImageUIDs,
	(entities, uids) => uids.map(uid => entities[uid] as Readonly<Entity & Partial<Image>>),
);
export const getTotal = (state: State) => state.search.browse ? state.search.browse.total : NaN;
