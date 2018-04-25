import { Dispatch } from "redux";
import { fetchLegacy, Image as LegacyImage } from "../../legacy/api";
import { State } from "../../stores";
import { fail, start, succeed } from "../../stores/async";
import { Entity, Image } from "../../stores/entities";
import { insertEntities } from "../../stores/searches";
const key = "browse";
type Results = Array<Entity & Partial<LegacyImage>>;
export const loadImages = (startIndex: number, size: number) =>
	async(dispatch: Dispatch<State>, getState: () => State) => {
		if (!(size > 0)) {
			return;
		}
		dispatch(start({ key }));
		try {
			const [total, results] = await Promise.all([
				fetchLegacy<number>(dispatch, "http://phylopic.org/api/a/image/count"),
				fetchLegacy<Results>(dispatch, `http://phylopic.org/api/a/image/list/${startIndex}/${size}?options=credit+licenseURL`),
			]);
			const entities: ReadonlyArray<Entity & Partial<Image>> = results.map(result => ({
				"attribution": result.credit,
				"licenseURL": result.licenseURL,
				"uid": result.uid,
			}));
			dispatch(insertEntities({
				entities,
				key,
				"start": startIndex,
				total,
			}));
		} catch (error) {
			dispatch(fail({ error, key }));
			return;
		}
		dispatch(succeed({ key }));
	};
