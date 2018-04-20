import { applyMiddleware, createStore } from "redux";
import middleware from "./middleware";
import reducers from "./reducers";
import { State } from "./State";
export type State = State;
export default createStore(
	reducers,
	{},
	applyMiddleware(...middleware),
);
