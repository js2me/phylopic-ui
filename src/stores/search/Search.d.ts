import { Params } from "./Params";
export interface Search<T> {
	readonly params: Params<T>;
	readonly total: number;
	readonly uids: ReadonlyArray<string>;
}
