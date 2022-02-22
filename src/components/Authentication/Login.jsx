import { Input, Stack, Button } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Valid_User } from "../../Redux/Authentication/Login/Action";
import "./Login.css";
import { New_User } from "../../Redux/Authentication/SignUp/Actions";
import { Navigate } from "react-router-dom";

const login = {
  email: "",
  password: "",
};
export const Login = () => {
  const [loginCredentails, setLoginCredentials] = useState(login);
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginCredentials({ ...loginCredentails, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    emailRef.current.value = "";
    passwordRef.current.value = "";
    axios.get("https://mini-project-rahul.herokuapp.com/users").then(({ data }) => {
      for (let i = 0; i < data.length; i++) {
        if (
          loginCredentails.email === data[i].email &&
          loginCredentails.password === data[i].password
        ) {
          dispatch(Valid_User({ auth: true, email: loginCredentails.email }));
          break;
        }

        if (i === data.length - 1) {
          dispatch(Valid_User({ auth: false, email: "" }));
          alert("Invalid Credentails");
        }
      }
    });
  };

  useEffect(() => {
    dispatch(New_User(false));
  }, []);
  if (auth.auth) {
    return <Navigate to="/counter" />;
  }

  return (
    <div className="LoginForm">
      <form>
        <Stack spacing={3}>
          <Input
            ref={emailRef}
            variant="outline"
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleInput}
            required
          />
          <Input
            ref={passwordRef}
            variant="outline"
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleInput}
            required
          />
          <Button colorScheme="blue" type="submit" onClick={handleLogin}>
            Login
          </Button>
        </Stack>
      </form>
    </div>
  );
};
