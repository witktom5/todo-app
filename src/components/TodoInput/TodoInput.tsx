import { TodoInputProps } from "../../types/todoInput";
import React, { useContext } from "react";
import TodoFormContext from "../../context/todos";

import styles from "./TodoInput.module.css";

function TodoInput({ placeholder, propName }: TodoInputProps) {
  const { title, setTitle, body, setBody } = useContext(TodoFormContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    propName === "todoTitle"
      ? setTitle(e.target.value)
      : setBody(e.target.value);
  };
  return (
    <input
      className={styles["form-input"]}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={propName === "todoTitle" ? title : body}
    ></input>
  );
}
export default TodoInput;
