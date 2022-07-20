import { useContext } from "react";
import TodosContext from "../../context/todos";

import { AxiosError } from "axios";
import { TodoCardProps } from "../../types/todoCard";
import styles from "./TodoCard.module.css";

import { useNavigate } from "react-router-dom";

import ConditionalLink from "../../shared/ConditionalLink";

import api from "../../shared/utils/api";

function TodoCard({ todo, isSelected }: TodoCardProps) {
  const navigate = useNavigate();

  const {
    editedTodo,
    setEditedTodo,
    setTitle,
    setBody,
    setTodos,
    setIsLoading,
    setErrorMsg,
  } = useContext(TodosContext);

  // ON EDIT TODO BTN

  const onEdit = () => {
    if (editedTodo && editedTodo.id === todo.id) {
      setEditedTodo(null);
      setTitle(null);
      setBody(null);
    } else {
      setEditedTodo(todo);
      setTitle(todo.title);
      setBody(todo.body);
    }
  };

  // ON COMPLETE TODO BTN

  const onComplete = async () => {
    try {
      setIsLoading(true);
      await api.put(`/todos/${todo.id}`, {
        ...todo,
        isComplete: !todo.isComplete,
      });
      const res = await api.get("/todos");
      setTodos(res.data);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Something went wrong...");
      }
    }
  };

  //  ON DELETE TODO BTN

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await api.delete(`/todos/${todo.id}`);
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Something went wrong...");
      }
    }
    navigate("/todos");
    setIsLoading(false);
  };

  return (
    <ConditionalLink url={isSelected ? null : `/todos/${todo.id}`}>
      <div
        className={`${styles["todo-card"]} ${
          todo.isComplete ? styles["todo-completed"] : ""
        } ${isSelected ? "" : styles["todo-unselected"]}`}
      >
        <div className={styles.row}>
          <h3 className={styles["todo-title"]}>{todo.title}</h3>
          {isSelected && (
            <div className={styles["todo-btn-group"]}>
              <button
                onClick={onEdit}
                className={`${styles["todo-btn"]} ${styles["btn-edit"]}`}
              >
                ✎
              </button>
              <button
                onClick={onComplete}
                className={`${styles["todo-btn"]} ${styles["btn-complete"]}`}
              >
                ✓
              </button>
              <button
                onClick={onDelete}
                className={`${styles["todo-btn"]} ${styles["btn-remove"]}`}
              >
                X
              </button>
            </div>
          )}
        </div>
        <div className={styles["todo-text"]}>{todo.body}</div>
      </div>
    </ConditionalLink>
  );
}
export default TodoCard;
