import { useSelector, useDispatch } from "react-redux";
import { Button, Heading } from "@chakra-ui/react";
import { Inc_Count, Dec_Count, Zero_Count } from "../../Redux/Counter/Actions";
import { Navigate } from "react-router-dom";
export const Counter = () => {
  const store = useSelector((store) => store);
  const { counter, auth } = store;
  console.log(store);
  const count = counter.count;
  console.log("kumar:", auth.auth);
  const dispatch = useDispatch();
  const IncCount = () => {
    dispatch(Inc_Count(1));
  };
  const DecCount = () => {
    dispatch(Dec_Count(1));
  };
  const reset = () => {
    dispatch(Zero_Count());
  };
  if (!auth.auth) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Heading m="3">Counter : {count}</Heading>
      <Button colorScheme="teal" onClick={IncCount} size="sm">
        Inc
      </Button>{" "}
      <Button colorScheme="teal" onClick={DecCount} size="sm">
        Dec
      </Button>{" "}
      <Button colorScheme="teal" onClick={reset} size="sm">
        Reset
      </Button>
    </div>
  );
};
