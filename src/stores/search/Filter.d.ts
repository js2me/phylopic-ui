interface ValueFilter<T, F extends keyof T> {
	readonly field: F;
	readonly operation: '=' | '!=' | '<=' | '>=' | 'contains';
	readonly value: Readonly<T[F]>;
}
interface ValuesFilter<T, F extends keyof T> {
	readonly field: F;
	readonly operation: 'in';
	readonly value: ReadonlySet<T[F]>;
}
export type Filter<T, F extends keyof T> = ValueFilter<T, F> | ValuesFilter<T, F>;
