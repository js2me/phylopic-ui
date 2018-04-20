import { State as EntitiesState } from "./entities";
import { State as LightboxState } from "./lightbox";
import { State as SearchState } from "./search";
import { State as WindowSizeState } from "./windowSize";
export interface State {
	entities: EntitiesState;
	lightbox: LightboxState;
	search: SearchState;
	windowSize: WindowSizeState;
}
