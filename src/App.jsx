import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Authentication/Login";
import { Navbar } from "./components/Navbar/Navbar";
import { SignUp } from "./components/Authentication/SignUp";
import { Counter } from "./components/Counter/Counter";
import { StopWatch } from "./components/StopWatch/StopWatch";
import { TodoInput } from "./components/Todo/TodoInput";
import { TodoEdit } from "./components/Todo/TodoEdit";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/counter" element={<Counter />}></Route>
        <Route path="/todo" element={<TodoInput />}></Route>
        <Route path="/stopwatch" element={<StopWatch />}></Route>
        <Route path="/todo/:user/:id" element={<TodoEdit />}></Route>
      </Routes>
    </div>
  );
}
export default App;
