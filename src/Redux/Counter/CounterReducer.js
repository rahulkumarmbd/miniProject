import { DEC_COUNT, INC_COUNT, RESET_COUNT } from "./ActionTypes";

const counter = {
  count: 0,
};
export const CounterReducer = (init = counter, { type, payload }) => {
  switch (type) {
    case INC_COUNT:
      return { ...init, count: init.count + payload };
    case DEC_COUNT:
      return { ...init, count: init.count - payload };
    case RESET_COUNT:
      return { ...init, count: 0 };
    default:
      return { ...init };
  }
};