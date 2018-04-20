import { Dispatch } from "redux";
import { fetchJSON } from "../helpers/transport";
export interface FailedResponse {
	readonly fault: {
		readonly code: string;
		readonly details: object | null;
		readonly message: string;
	};
	readonly success: false;
}
export interface SuccessfulResponse<R> {
	readonly result: R;
	readonly success: true;
}
export type Response<R> = FailedResponse | SuccessfulResponse<R>;
export interface Entity {
	readonly uid: string;
}
export interface Image {
	readonly credit: string;
	readonly directNames: ReadonlyArray<Entity & Partial<Name>>;
	readonly licenseURL: string;
	readonly modified: string;
	readonly pngFiles: ReadonlyArray<PNGFile>;
	readonly submitted: string;
	readonly submitter: Entity & Partial<User>;
	readonly svgFile: SVGFile | null;
	readonly taxa: ReadonlyArray<Partial<Taxon>>;
}
export interface Name {
	readonly citationStart: number;
	readonly html: string;
	readonly namebankID: string;
	readonly root: boolean;
	readonly string: string;
	readonly type: string;
	readonly uri: string;
	// votes: number;
}
export interface NameSet {
	readonly names: ReadonlyArray<Partial<Name>>;
}
export interface PNGFile {
	readonly height: number;
	readonly url: string;
	readonly width: number;
}
export interface Source {
	readonly title: string;
	readonly uri: string;
}
export interface SVGFile {
	readonly url: string;
}
export interface Taxon {
	readonly canonicalName: Entity & Partial<Name>;
	readonly icon: Entity;
	readonly illustrated: boolean;
	readonly names: ReadonlyArray<Entity & Partial<Name>>;
}
export interface User {
	readonly allowContact: boolean;
	readonly email: string;
	readonly firstName: string;
	readonly lastName: string;
}
export async function fetchLegacy<R>(dispatch: Dispatch<{}>, url: string, init?: RequestInit): Promise<R> {
	if (!init) {
		init = {
			"method": "GET",
		};
	}
	const response = await dispatch(fetchJSON<Response<R>>({init, url}));
	if (!response.success) {
		throw new Error(response.fault.message);
	}
	return response.result;
}
