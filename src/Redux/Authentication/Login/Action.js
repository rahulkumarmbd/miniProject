import { VALID_USER } from "./ActionTypes";
export const Valid_User = (payload) => {
  return {
    type: VALID_USER,
    payload,
  };
};