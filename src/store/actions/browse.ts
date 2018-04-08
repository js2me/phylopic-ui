import { Dispatch } from "redux";
import { State } from "../reducers";
import { Entity } from "../types/Entity";
import { Image } from "../types/Image";
import { addToList, setListProgress, setListTotal } from "./entities";
import { Response } from "./legacy";
import { fetchJSON } from "./transport";
const listID = "browse";
type Result = Array<{
	credit: string;
	licenseURL: string;
	uid: string;
}>;
export const getImages = (start: number, size: number) => async(dispatch: Dispatch<State>) => {
	dispatch(setListProgress({
		listID,
		"progress": {
			"status": "pending",
		},
	}));
	try {
		if (!start) {
			const response = await dispatch(fetchJSON<Response<number>>("http://phylopic.org/api/a/image/count", {
				"method": "GET",
			}));
			if (!response.success) {
				throw new Error(response.fault.message);
			}
			const total = response.result;
			dispatch(setListTotal({
				listID,
				total,
			}));
		}
		{
			const response = await dispatch(fetchJSON<Response<Result>>(`http://phylopic.org/api/a/image/list/${start}/${size}?options=credit+licenseURL`, {
				"method": "GET",
			}));
			if (!response.success) {
				throw new Error(response.fault.message);
			}
			const entities: Array<Entity & Partial<Image>> = response.result.map(result => ({
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
		}
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
