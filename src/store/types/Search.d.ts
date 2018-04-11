import { Progress } from "./Progress";
export interface Sort<T> {
	descending?: true;
	field: keyof T;
}
interface ValueFilter<T, F extends keyof T> {
	field: F;
	operation: '=' | '!=' | '<=' | '>=' | 'contains';
	value: Readonly<T[F]>;
}
interface ValuesFilter<T, F extends keyof T> {
	field: F;
	operation: 'in';
	value: ReadonlySet<T[F]>;
}
export type Filter<T, F extends keyof T> = ValueFilter<T, F> | ValuesFilter<T, F>;
export interface Search<T> extends Progress {
	fields: ReadonlySet<keyof T>;
	filters: ReadonlySet<Readonly<Filter<T, keyof T>>>;
	sort: ReadonlyArray<Readonly<Sort<T>>>;
	total: number;
	uids: ReadonlyArray<string>;
}
