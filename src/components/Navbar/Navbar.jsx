import { Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Valid_User } from "../../Redux/Authentication/Login/Action";
import {Switch} from "../switch";
import "./Navbar.css";

export const Navbar = () => {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  return (
    <div>
      {!auth.auth ? (
        <div className="Navbar">
          <div>Mini Project</div>
          <div>Please Login</div>
          <div>
            <div>
              <Link to="/">
                <Button colorScheme="blue" size="sm">
                  Login
                </Button>
              </Link>
              {"   "}
              <Link to="/signUp">
                <Button colorScheme="blue" size="sm">
                  SignUp
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className="Navbar">
              <div>Mini Project</div>
              <div>{auth.email}</div>
              <div>
                <div>
                  <Link to="/">
                    <Button
                      onClick={() =>
                        dispatch(Valid_User({ auth: false, email: "" }))
                      }
                      colorScheme="blue"
                      size="md"
                    >
                      LogOut
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
              <Switch/>
          </div>
        </div>
      )}
    </div>
  );
};
