import { NEW_USER } from "./ActionTypes";
const signUp = {
  new_user: false,
};
export const SignUpReducer = (init = signUp, { type, payload }) => {
  switch (type) {
    case NEW_USER:
      return { ...init, new_user: payload };
    default:
      return { ...init };
  }
};
