import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./TodoList.css";
import { Toggle_Status } from "../../Redux/Todo/actions";

export const TodoList = ({ idRef, newAdded }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleToggle = (id) => {
    axios
      .get(`https://mini-project-rahul.herokuapp.com/todos/${idRef.current}`)
      .then(({ data }) => {
        for (let i = 0; i < data.userTodo.length; i++) {
          if (id === data.userTodo[i].id) {
            data.userTodo[i].status = !data.userTodo[i].status;
            dispatch(Toggle_Status(data));
            setData(data.userTodo);
            axios.patch(`https://mini-project-rahul.herokuapp.com/todos/${idRef.current}`, data);
            break;
          }
        }
      });
  };

  const handleDelete = (id) => {
    axios
      .get(`https://mini-project-rahul.herokuapp.com/todos/${idRef.current}`)
      .then(({ data }) => {
        for (let i = 0; i < data.userTodo.length; i++) {
          if (id === data.userTodo[i].id) {
            data.userTodo.splice(i, 1);
            dispatch(Toggle_Status(data));
            setData(data.userTodo);
            axios.patch(`https://mini-project-rahul.herokuapp.com/todos/${idRef.current}`, data);
            break;
          }
        }
      });
  };

  useEffect(() => {
    setIsEmpty(false);
    if (!idRef.current) {
      return;
    }
    axios
      .get(`https://mini-project-rahul.herokuapp.com/todos/${idRef.current}`)
      .then(({ data }) => {
        setIsLoading(false);
        if (data.userTodo.length === 0) {
          setIsEmpty(true);
        }
        setData(data.userTodo);
      });
  }, [newAdded]);

  return (
    <div>
      {isLoading ? (
        "...loading"
      ) : isEmpty ? (
        "There is nothing in your Todo List"
      ) : (
        <div className="TodoList">
          <div>
            <div>
              <Heading as="h4" size="md">
                Title
              </Heading>
              <Heading as="h4" size="md">
                Description
              </Heading>
              <Heading as="h4" size="md">
                Status
              </Heading>
              <Heading as="h4" size="md">
                Toggle
              </Heading>
              <Heading as="h4" size="md">
                Edit
              </Heading>
              <Heading as="h4" size="md">
                Delete
              </Heading>
            </div>
          </div>
          <div>
            {data.map((item) => {
              return (
                <div key={item.id}>
                  <div>{item.title}</div>
                  <div>{item.description}</div>
                  <div>{item.status ? "Done" : "Not Done"}</div>
                  <div>
                    <Button onClick={() => handleToggle(item.id)}>
                      Toggle Status
                    </Button>
                  </div>
                  <div>
                    <Link to={`/todo/${idRef.current}/${item.id}`}>
                      <Button>Edit</Button>
                    </Link>
                  </div>
                  <div>
                    <Button onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
