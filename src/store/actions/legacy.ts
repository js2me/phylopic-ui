import { Dispatch } from "redux";
import { Entity } from "../types/Entity";
import { fetchJSON } from "./transport";
export interface FailedResponse {
	fault: {
		code: string;
		details: object | null;
		message: string;
	};
	success: false;
}
export interface SuccessfulResponse<R> {
	result: R;
	success: true;
}
export type Response<R> = FailedResponse | SuccessfulResponse<R>;
export interface Image {
	credit: string;
	directNames: Array<Entity & Partial<Name>>;
	licenseURL: string;
	modified: string;
	pngFiles: PNGFile[];
	submitted: string;
	submitter: Entity & Partial<User>;
	svgFile: SVGFile | null;
	taxa: Array<Partial<Taxon>>;
}
export interface Name {
	citationStart: number;
	html: string;
	namebankID: string;
	root: boolean;
	string: string;
	type: string;
	uri: string;
	// votes: number;
}
export interface NameSet {
	names: Array<Partial<Name>>;
}
export interface PNGFile {
	height: number;
	url: string;
	width: number;
}
export interface Source {
	title: string;
	uri: string;
}
export interface SVGFile {
	url: string;
}
export interface Taxon {
	canonicalName: Entity & Partial<Name>;
	icon: Entity;
	illustrated: boolean;
	names: Array<Entity & Partial<Name>>;
}
export interface User {
	allowContact: boolean;
	email: string;
	firstName: string;
	lastName: string;
}
export const fetchLegacy = async <R>(dispatch: Dispatch<{}>, url: string, init?: RequestInit) => {
	if (!init) {
		init = {
			"method": "GET",
		};
	}
	const response = await dispatch(fetchJSON<Response<R>>(url, init));
	if (!response.success) {
		throw new Error(response.fault.message);
	}
	return response.result;
};
