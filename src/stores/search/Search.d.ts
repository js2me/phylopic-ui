import { Progress } from "../async/Progress";
import { Filter } from "./Filter";
import { Sort } from "./Sort";
export interface Search<T> extends Progress {
	readonly fields: ReadonlySet<keyof T>;
	readonly filters: ReadonlySet<Readonly<Filter<T, keyof T>>>;
	readonly sort: ReadonlyArray<Readonly<Sort<T>>>;
	readonly total: number;
	readonly uids: ReadonlyArray<string>;
}
