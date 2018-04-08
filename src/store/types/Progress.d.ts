export interface Failure {
	readonly error: Error;
	readonly status: "failure";
}
export interface Pending {
	readonly status: "pending";
	readonly loaded?: number;
	readonly total?: number;
}
export interface Success {
	readonly status: "success";
}
export type Progress = Pending | Failure | Success;
