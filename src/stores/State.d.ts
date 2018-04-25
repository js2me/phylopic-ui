import { State as AsyncState } from "./async";
import { State as EntitiesState } from "./entities";
import { State as LightboxState } from "./lightbox";
import { State as SearchesState } from "./searches";
import { State as SelectionsState } from "./selections";
import { State as WindowSizeState } from "./windowSize";
export interface State {
	async: AsyncState,
	entities: EntitiesState;
	lightbox: LightboxState;
	searches: SearchesState;
	selections: SelectionsState;
	windowSize: WindowSizeState;
}
