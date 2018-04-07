import { ProgressiveList } from "./types/ProgressiveList";
import { State } from "./types/State";
const createProgressiveList: () => ProgressiveList = () => ({
	"progress": {
		"status": "pending",
	},
	"total": NaN,
	"uids": [],
});
const initialState: State = {
	"entitiesByUID": {},
	"entityLists": {
		"browse": createProgressiveList(),
	},
	"version": "0.1.0", // :TODO: get from package.json
};
export default initialState;
