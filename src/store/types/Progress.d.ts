export interface Progress {
	error: Readonly<Error> | null;
	pending: boolean;
}
