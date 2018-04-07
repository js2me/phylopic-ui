import { applyMiddleware, createStore } from "redux";
import initialState from "./initialState";
import middleware from "./middleware";
import reducers from "./reducers";
export default createStore(
	reducers,
	initialState,
	applyMiddleware(...middleware),
);
