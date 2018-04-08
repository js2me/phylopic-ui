import { Action } from "../actions/Action";
import {
	SET_LIGHTBOX,
	SetLightboxPayload,
} from "../actions/lightbox";
import { Entity } from "../types/Entity";
import { Image } from "../types/Image";
import { Progress } from "../types/Progress";
export interface State {
	image: (Entity & Image) | null;
	progress: Progress;
}
export default (state: State, action: Action<{}>) => {
	if (!state) {
		state = {
			"image": null,
			"progress": {
				"status": "success",
			}
		};
	}
	if (action.type === SET_LIGHTBOX) {
		const { image, progress } = action.payload as SetLightboxPayload;
		state = {
			"image": image || state.image,
			"progress": progress || state.progress,
		};
	}
	return state;
};
