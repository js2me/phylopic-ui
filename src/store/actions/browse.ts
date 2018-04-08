import { Dispatch } from "redux";
import { State } from "../reducers";
import { Entity } from "../types/Entity";
import { Image } from "../types/Image";
import { addToList, setListProgress, setListTotal } from "./entities";
import { fetchLegacy, Image as LegacyImage } from "./legacy";
const listID = "browse";
type Results = Array<Entity & Partial<LegacyImage>>;
export const countLoadedImages = () =>
	(dispatch: Dispatch<State>, getState: () => State) =>
		getState().entities.lists[listID].uids.length;
export const getImages = (start: number, size: number) => async(dispatch: Dispatch<State>) => {
	dispatch(setListProgress({
		listID,
		"progress": {
			"status": "pending",
		},
	}));
	try {
		if (!start) {
			const total = await fetchLegacy<number>(dispatch, "http://phylopic.org/api/a/image/count");
			dispatch(setListTotal({
				listID,
				total,
			}));
		}
		const results = await fetchLegacy<Results>(dispatch, `http://phylopic.org/api/a/image/list/${start}/${size}?options=credit+licenseURL`);
		const entities: Array<Entity & Partial<Image>> = results.map(result => ({
			...result,
			"attribution": result.credit,
		}));
		dispatch(addToList({
			entities,
			listID,
			start,
		}));
		dispatch(setListProgress({
			listID,
			"progress": {
				"status": "success",
			},
		}));
	} catch (error) {
		dispatch(setListProgress({
			listID,
			"progress": {
				error,
				"status": "failure",
			},
		}));
	}
};
