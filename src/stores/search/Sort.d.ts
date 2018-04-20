export interface Sort<T> {
	readonly descending?: true;
	readonly field: keyof T;
}
