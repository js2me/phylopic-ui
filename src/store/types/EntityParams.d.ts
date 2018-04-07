export interface EntityParams<T> {
    fields?: Set<keyof T>;
    uid: string;
}
