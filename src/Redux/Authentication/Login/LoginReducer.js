import { VALID_USER } from "./ActionTypes";

const auth = {
  auth: false,
  email: "",
};

export const LoginReducer = (state = auth, { type, payload }) => {
  switch (type) {
    case VALID_USER:
      return { ...state, auth: payload.auth, email: payload.email };
    default:
      return { ...state };
  }
};
