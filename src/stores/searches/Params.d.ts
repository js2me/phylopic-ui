import { Filter } from "./Filter";
import { Sort } from "./Sort";
export interface Params<T> {
	readonly fields: ReadonlySet<keyof T>;
	readonly filters: ReadonlySet<Readonly<Filter<T, keyof T>>>;
	readonly sort: ReadonlyArray<Readonly<Sort<T>>>;
}
