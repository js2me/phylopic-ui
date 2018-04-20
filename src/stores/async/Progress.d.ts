export interface Progress {
	readonly error: Readonly<Error> | null;
	readonly pending: boolean;
}
