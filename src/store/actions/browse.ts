import { Dispatch } from "redux";
import { State } from "../reducers";
import { Entity } from "../types/Entity";
import { Image } from "../types/Image";
import { fetchLegacy, Image as LegacyImage } from "./legacy";
import { completeSearch, failSearch, startSearch } from "./search";
const key = "browse";
type Results = Array<Entity & Partial<LegacyImage>>;
export const countLoadedImages = () =>
	(dispatch: Dispatch<State>, getState: () => State) => {
		const search = getState().search[key];
		return search
			? search.uids.length
			: 0;
	};
export const getImages = (start: number, size: number) =>
	async(dispatch: Dispatch<State>, getState: () => State) => {
		const search = getState().search[key];
		if (search && search.pending) {
			throw new Error("Search already in progress.");
		}
		dispatch(startSearch({ key }));
		try {
			const [total, results] = await Promise.all([
				fetchLegacy<number>(dispatch, "http://phylopic.org/api/a/image/count"),
				fetchLegacy<Results>(dispatch, `http://phylopic.org/api/a/image/list/${start}/${size}?options=credit+licenseURL`),
			]);
			const entities: Array<Entity & Partial<Image>> = results.map(result => ({
				...result,
				"attribution": result.credit,
			}));
			return dispatch(completeSearch({ entities, key, total }));
		} catch (error) {
			dispatch(failSearch({ error, key }));
			throw error;
		}
	};
