import { applyMiddleware, compose, createStore } from "redux";
import middleware from "./middleware";
import reducers from "./reducers";
import { State } from "./State";
export type State = State;
declare const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
// :TODO: Check environment.
const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
	reducers,
	{},
	composeEnhancers(
		applyMiddleware(...middleware),
	),
);
