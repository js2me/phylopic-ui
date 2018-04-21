import { State as AsyncState } from "./async";
import { State as EntitiesState } from "./entities";
import { State as LightboxState } from "./lightbox";
import { State as SearchState } from "./search";
import { State as WindowSizeState } from "./windowSize";
export interface State {
    async: AsyncState,
	entities: EntitiesState;
	lightbox: LightboxState;
	search: SearchState;
	windowSize: WindowSizeState;
}
