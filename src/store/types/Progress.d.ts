export interface Failure {
    error: Error;
    status: "failure";
}
export interface Pending {
    status: "pending";
    loaded?: number;
    total?: number;
}
export interface Success {
    status: "success";
}
export type Progress = Pending | Failure | Success;
