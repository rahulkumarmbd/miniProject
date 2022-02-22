import { UPDATE_DATA, TOGGLE_STATUS } from "./ActionTypes";

export const Update_Data = (payload) => {
  return {
    type: UPDATE_DATA,
    payload,
  };
};

export const Toggle_Status = (payload) => {
  return {
    type: TOGGLE_STATUS,
    payload,
  };
};
