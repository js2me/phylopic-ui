// import { Dispatch } from "redux";
// import { State } from "../reducers";
// import { Filter, ListParams } from "../types/ListParams";
export class ResponseError extends Error {
	constructor(public readonly response: Response) {
		super(response.statusText);
	}
}
export const fetchJSON = <T>(payload: {
	init: RequestInit,
	url: string,
}) => async() => {
	const { init, url } = payload;
	const headers = new Headers(init.headers);
	headers.append("Accept", "application/json");
	headers.append("Accept-Charset", "utf-8");
	const response = await fetch(url, {...init, headers});
	if (!response.ok) {
		throw new ResponseError(response);
	}
	const result: T = await response.json();
	return result;
};
/*
const filterToEntry = <T, F extends keyof T>(filter: Filter<T, F>) => {
	const writeOperation = () => {
		switch (filter.operation) {
			case "=": {
				return "";
			}
			case "!=":
			case "<=":
			case ">=": {
				return filter.operation.charAt(0);
			}
			default: {
				return `__${filter.operation}`;
			}
		}
	};
	const writeValue = () => {
		if (filter.operation === "in") {
			return new Array(filter.value)
				.map(String)
				.sort()
				.join(",");
		}
		return String(filter.value);
	};
	return [`${filter.field}${writeOperation()}`, writeValue()];
};
export const fetchList = <T>(endpoint: string, params: ListParams<T>) => async(dispatch: Dispatch<State>) => {
	const query: {
		[key: string]: string;
	} = {
		"size": String(params.size),
		"start": String(params.start),
	};
	if (params.fields) {
		query.fields = new Array(params.fields)
			.sort()
			.join(",");
	}
	if (params.filters) {
		params.filters.forEach(filter => {
			const [field, value] = filterToEntry(filter);
			query[field] = value;
		});
	}
	if (params.sort) {
		query.sort = params.sort
			.map(sort => `${sort.field}${sort.descending ? "-" : ""}`)
			.join(",");
	}
	const queryString = Object
		.keys(query)
		.sort()
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
		.join("&");
	const init: RequestInit = {
		"method": "GET",
	};
	return dispatch(fetchJSON<T[]>(`${endpoint}?${queryString}`, init));
};
*/
