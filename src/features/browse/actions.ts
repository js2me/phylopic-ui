import { Dispatch } from "redux";
import { fetchLegacy, Image as LegacyImage } from "../../legacy/api";
import { State } from "../../stores";
import { Entity, Image } from "../../stores/entities";
import { completeSearch, failSearch, startSearch } from "../../stores/search";
const key = "browse";
type Results = Array<Entity & Partial<LegacyImage>>;
export const loadImages = (start: number, size: number) =>
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
				"attribution": result.credit,
				"licenseURL": result.licenseURL,
				"uid": result.uid,
			}));
			return dispatch(completeSearch({ entities, key, total }));
		} catch (error) {
			dispatch(failSearch({ error, key }));
		}
	};
