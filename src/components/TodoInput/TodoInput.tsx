import { TodoInputProps } from "../../types/todoInput";
import React, { useContext } from "react";
import TodoFormContext from "../../context/todos";

import styles from "./TodoInput.module.css";

function TodoInput({ placeholder, propName }: TodoInputProps) {
  const { todoState, todoDispatch } = useContext(TodoFormContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    propName === "todoTitle"
      ? todoDispatch({
          type: "set-todo-form",
          payload: { ...todoState.todoForm, title: e.target.value },
        })
      : todoDispatch({
          type: "set-todo-form",
          payload: { ...todoState.todoForm, body: e.target.value },
        });
  };
  return (
    <input
      className={styles["form-input"]}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={
        propName === "todoTitle"
          ? todoState.todoForm.title
          : todoState.todoForm.body
      }
    ></input>
  );
}
export default TodoInput;
