export interface Sort<T> {
    descending?: true;
    field: keyof T;
}
interface ValueFilter<T, F extends keyof T> {
    field: F;
    operation: '=' | '!=' | '<=' | '>=' | 'contains';
    value: T[F];
}
interface ValuesFilter<T, F extends keyof T> {
    field: F;
    operation: 'in';
    value: Set<T[F]>;
}
export type Filter<T, F extends keyof T> = ValueFilter<T, F> | ValuesFilter<T, F>;
export interface ListParams<T> {
    fields?: Set<keyof T>;
    filters?: Set<Filter<T, keyof T>>;
    size: number;
    sort?: Array<Sort<T>>;
    start: number;
}
