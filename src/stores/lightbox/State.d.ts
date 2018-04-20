import { Progress } from "../async/Progress";
export interface State {
	readonly imageUID: string | null;
	readonly progress: Progress;
}
