import { createStore, applyMiddleware, combineReducers } from "redux";
import { LoginReducer } from "./Authentication/Login/LoginReducer";
import { SignUpReducer } from "./Authentication/SignUp/SingUpReducer";
import { CounterReducer } from "./Counter/CounterReducer";
import { TodoReducer } from "./Todo/TodoReducer";

const logger = (store) => (next) => (action) => {
  // console.log("inside logger");
  // console.log(action);
  next(action);
  // console.log("outside logger");
};

const combinedReducers = combineReducers({
  auth: LoginReducer,
  SignUp: SignUpReducer,
  counter: CounterReducer,
  Todo: TodoReducer,
});

export const Store = createStore(combinedReducers, applyMiddleware(logger));
