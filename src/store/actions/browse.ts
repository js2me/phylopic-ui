import { Dispatch } from "redux";
import { Entity } from "../types/Entity";
import { Image } from "../types/Image";
import { State } from "../types/State";
import { addToList } from "./entities";
import { fetchJSON } from "./transport";
const listID = "browse";
export const getImages = (start: number, size: number) => async(dispatch: Dispatch<State>) => {
	const response  = await dispatch(fetchJSON(`http://phylopic.org/api/a/image/list?length=${size}&options=credit+licenseURL&start=${start}`, {
		"method": "GET",
	})) as {
		results: Array<{
			credit: string;
			licenseURL: string;
			uid: string;
		}>,
		status: "success" | "failure",
	};
	if (response.status !== "success") {
		throw new Error(); // :TODO: details
	}
	const entities: Array<Entity & Partial<Image>> = response.results.map(result => ({
		...result,
		"attribution": result.credit,
	}));
	await dispatch(addToList({
		entities,
		listID,
		start,
	}));
};
