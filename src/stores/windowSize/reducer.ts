import { getWindowSize } from "../../helpers/windowSize";
import {
	Action,
	Types,
} from "./actions";
export type State = [number, number];
export default (state: State, action: Action) => {
	if (action.type === Types.SET) {
		return action.payload;
	}
	return state || getWindowSize();
};
