import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
//import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = () =>
  createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
