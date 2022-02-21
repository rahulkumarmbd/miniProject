import { createStore } from "redux";
import { GoogleSearchEngineReducer } from "./Reducer";

export const Store = createStore(GoogleSearchEngineReducer);
console.log("store", Store);
