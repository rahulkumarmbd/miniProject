import { DEC_COUNT, INC_COUNT, RESET_COUNT } from "./ActionTypes";

export const Inc_Count = (payload) => {
  return {
    type: INC_COUNT,
    payload,
  };
};

export const Dec_Count = (payload) => {
  return {
    type: DEC_COUNT,
    payload,
  };
};

export const Zero_Count = () => {
  return {
    type: RESET_COUNT,
  };
};
