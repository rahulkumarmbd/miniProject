import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import "../Authentication/Login.css";

export const TodoEdit = () => {
  const { id, user } = useParams();
  const titleRef = useRef();
  const descRef = useRef();
  const statusRef = useRef();
  const [todo, setTodo] = useState({});
  const [edit, setEdit] = useState(false);
  const auth = useSelector((store) => store.auth);

  const handleChange = (e) => {
    let { value, name, checked, type } = e.target;
    value = type === "checkbox" ? checked : value;
    setTodo((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(todo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://mini-project-rahul.herokuapp.com/todos/${user}`).then(({ data }) => {
      for (let i = 0; i < data.userTodo.length; i++) {
        if (id === data.userTodo[i].id) {
          data.userTodo[i].title = todo.title;
          data.userTodo[i].description = todo.description;
          data.userTodo[i].status = todo.status;
          axios.patch(`https://mini-project-rahul.herokuapp.com/todos/${user}`, data).then(() => {
            setEdit(true);
          });
          break;
        }
      }
    });
  };

  useEffect(() => {
    axios.get(`https://mini-project-rahul.herokuapp.com/todos/${user}`).then(({ data }) => {
      for (let i = 0; i < data.userTodo.length; i++) {
        if (id === data.userTodo[i].id) {
          titleRef.current.value = data.userTodo[i].title;
          descRef.current.value = data.userTodo[i].description;
          setTodo({
            title: data.userTodo[i].title,
            description: data.userTodo[i].description,
            status: false,
          });
          break;
        }
      }
    });
  }, []);

  if (edit) {
    return <Navigate to={`/todo`} />;
  }

  if (!auth.auth) {
    return <Navigate to={`/`} />;
  }

  return (
    <div className="LoginForm">
      <form>
        <Stack spacing={3}>
          <Input
            ref={titleRef}
            variant="outline"
            type="text"
            placeholder="Enter your Title"
            name="title"
            onChange={handleChange}
            required
          />
          <Input
            ref={descRef}
            variant="outline"
            type="text"
            placeholder="Enter your description"
            name="description"
            onChange={handleChange}
            required
          />
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              your todo status?
            </FormLabel>
            <Switch
              id="email-alerts"
              ref={statusRef}
              onChange={handleChange}
              name="status"
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" onClick={handleSubmit}>
            Submit Edit
          </Button>
        </Stack>
      </form>
    </div>
  );
};