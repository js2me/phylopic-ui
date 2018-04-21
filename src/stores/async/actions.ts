import { Dispatch } from "react-redux";
import { State } from "../";
export enum Types {
	FAIL = "async/FAIL",
	START = "async/START",
	SUCCEED = "async/SUCCEED",
}
export const fail = (payload: {
	error: Error;
	key: string;
}) => ({
	payload,
	"type": Types.FAIL as Types.FAIL,
});
export const start = (payload: { key: string; }) => ({
	payload,
	"type": Types.START as Types.START,
});
export const succeed = (payload: { key: string; }) => ({
	payload,
	"type": Types.SUCCEED as Types.SUCCEED,
});
export type Action = ReturnType<typeof fail>
	| ReturnType<typeof start>
	| ReturnType<typeof succeed>;
export const inspect = <T>(payload: {key: string, promise: Promise<T> }) =>
	async(dispatch: Dispatch<State>, getState: () => State) => {
		const { key, promise } = payload;
		dispatch(start({ key }));
		let result: T | undefined;
		try {
			result = await promise;
			dispatch(succeed({ key }));
		} catch (error) {
			dispatch(fail({ error, key }));
		}
		return result as T;
	};
