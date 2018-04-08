import { Action } from "../actions/Action";
import {
	SET_LIGHTBOX,
	SetLightboxPayload,
} from "../actions/lightbox";
import { Progress } from "../types/Progress";
export interface State {
	imageUID: string | null;
	progress: Progress;
}
export default (state: State, action: Action<{}>) => {
	if (!state) {
		state = {
			"imageUID": null,
			"progress": {
				"status": "success",
			}
		};
	}
	if (action.type === SET_LIGHTBOX) {
		const { imageUID, progress } = action.payload as SetLightboxPayload;
		state = {
			"imageUID": imageUID === undefined ? state.imageUID : imageUID,
			"progress": progress || state.progress,
		};
	}
	return state;
};
