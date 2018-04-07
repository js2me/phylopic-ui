export interface Action<P> {
    payload: P;
    type: string;
}
