import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext.js";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push("/login");
  });

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { checked: false, text: todoText };
    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  const toggleTodo = (index) => {
    const newTodoList = [...todos];
    newTodoList[index].checked = !newTodoList[index].checked;
    setTodos(newTodoList);
  };

  return (
    <div>
      <div>
        <h1>Todo List</h1>
      </div>
      {todos.map((todo, index) => (
        <div key={index}>
          <input id="checkbox1" type="checkbox" />
          {/*ADD for="checkbox1" TO LABEL TO SELECT WORD AS WELL*/}
          <label>{todo.text}</label>
        </div>
      ))}

      <div>
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          ></input>
          <button onClick={addTodo}>ADD</button>
        </form>
      </div>
    </div>
  );
}
