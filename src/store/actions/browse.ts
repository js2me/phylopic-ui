import { Dispatch } from "redux";
import { State } from "../reducers";
import { Entity } from "../types/Entity";
import { Image } from "../types/Image";
import { addToList } from "./entities";
import { fetchJSON } from "./transport";
const listID = "browse";
interface LegacyResponse {
	results: Array<{
		credit: string;
		licenseURL: string;
		uid: string;
	}>;
	status: "success" | "failure";
}
export const getImages = (start: number, size: number) => async(dispatch: Dispatch<State>) => {
	const response  = await dispatch(fetchJSON<LegacyResponse>(`http://phylopic.org/api/a/image/list?length=${size}&options=credit+licenseURL&start=${start}`, {
		"method": "GET",
	}));
	if (response.status !== "success") {
		throw new Error(); // :TODO: details
	}
	const entities: Array<Entity & Partial<Image>> = response.results.map(result => ({
		...result,
		"attribution": result.credit,
	}));
	dispatch(addToList({
		entities,
		listID,
		start,
	}));
};
