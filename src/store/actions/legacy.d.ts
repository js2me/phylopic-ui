export interface FailedResponse {
    fault: {
		code: string;
		details: object | null;
		message: string;
	};
    success: false;
}
export interface SuccessfulResponse<R> {
    result: R;
    success: true;
}
export type Response<R> = FailedResponse | SuccessfulResponse<R>;
