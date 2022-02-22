import { TOGGLE_STATUS, UPDATE_DATA } from "./ActionTypes.js";

const initState = [];

export const TodoReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case UPDATE_DATA:
      return [...payload];
    case TOGGLE_STATUS:
      return [...store, {...payload}];
    default:
      return [...store];
  }
};
