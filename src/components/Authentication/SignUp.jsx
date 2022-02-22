import {
  Input,
  Stack,
  Button,
  InputGroup,
  Checkbox,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { New_User } from "../../Redux/Authentication/SignUp/Actions";

const signUp = {
  email: "",
  password: "",
  mobileNum: "",
  is18: "false",
};
export const SignUp = () => {
  const [SignUpCredentails, setSignUpCredentials] = useState(signUp);
  const dispatch = useDispatch();
  const { new_user } = useSelector((store) => store.SignUp);
  const handleInput = (e) => {
    let { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      value = checked ? "true" : "false";
    }
    setSignUpCredentials({ ...SignUpCredentails, [name]: value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    axios.get("https://mini-project-rahul.herokuapp.com/users").then(({ data }) => {
      for (let i = 0; i < data.length; i++) {
        if (SignUpCredentails.email === data[i].email) {
          alert("User Already Exits , Please Login");
          return;
        }
      }
      axios
        .post("https://mini-project-rahul.herokuapp.com/users", { ...SignUpCredentails })
        .then((res) => {
          alert("SignUp Sucessful");
          dispatch(New_User(true));
        });
    });
  };

  if (new_user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="LoginForm">
      <form>
        <Stack spacing={3}>
          <Input
            variant="outline"
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleInput}
            required
          />
          <Input
            variant="outline"
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleInput}
            required
          />
          <InputGroup>
            <InputLeftAddon children="+91" />
            <Input
              type="number"
              placeholder="phone number"
              name="mobileNum"
              onChange={handleInput}
            />
          </InputGroup>
          <Checkbox name="is18" onChange={handleInput}>
            Are you older than 18
          </Checkbox>
          <Button colorScheme="blue" type="submit" onClick={handleSignUp}>
            SignUp
          </Button>
        </Stack>
      </form>
    </div>
  );
};
