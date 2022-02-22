import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Box, Input } from "@chakra-ui/react";
import "./TodoInput.css";
import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { TodoList } from "./TodoList";
import axios from "axios";
import { Update_Data } from "../../Redux/Todo/actions";
const initTodo = {
  title: "",
  description: "",
  status: false,
};
export const TodoInput = () => {
  const dispatch = useDispatch();
  const Store = useSelector((store) => store);
  const [newAdded, setNewAdded] = useState(false);
  const titleRef = useRef();
  const descRef = useRef();
  const idRef = useRef(null);
  const { auth } = Store;
  const [todo, setTodo] = useState(initTodo);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value, id: uuid() });
  };

  const handleSubmit = (e) => {
    setNewAdded(false);
    e.preventDefault();
    titleRef.current.value = "";
    descRef.current.value = "";
    axios
      .get(`https://mini-project-rahul.herokuapp.com/todos/${idRef.current}`)
      .then(({ data }) => {
        axios
          .patch(`https://mini-project-rahul.herokuapp.com/todos/${idRef.current}`, {
            ...data,
            userTodo: [...data.userTodo, todo],
          })
          .then(({ newData }) => {
            setNewAdded(true);
          });
      });
  };

  useEffect(() => {
    setNewAdded(false);
    axios.get("https://mini-project-rahul.herokuapp.com/todos").then(({ data }) => {
      dispatch(Update_Data(data));
      for (let i = 0; i < data.length; i++) {
        if (auth.email === data[i].email || auth.email === "") {
          idRef.current = data[i].id;
          setNewAdded(true);
          return;
        }
      }
      axios
        .post("https://mini-project-rahul.herokuapp.com/todos", {
          email: auth.email,
          userTodo: [],
        })
        .then(({ data }) => {
          idRef.current = data.id;
          setNewAdded(true);
        });
    });
  }, []);

  if (!auth.auth) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <div>
        <div className="TodoInput">
          <form>
            <Box spacing={3}>
              <Input
                ref={titleRef}
                variant="outline"
                type="text"
                placeholder="Enter your title"
                name="title"
                onChange={handleInput}
                required
              />
              <Input
                ref={descRef}
                variant="outline"
                type="text"
                placeholder="Enter your title description"
                name="description"
                onChange={handleInput}
                required
              />
              <Button colorScheme="blue" type="submit" onClick={handleSubmit}>
                Enter
              </Button>
            </Box>
          </form>
        </div>
      </div>
      <div>
        <TodoList idRef={idRef} newAdded={newAdded} />
      </div>
    </div>
  );
};
