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

  const { todoDispatch, todoState, setIsLoading, setErrorMsg } =
    useContext(TodosContext);

  // ON EDIT TODO BTN

  const onEdit = () => {
    if (todoState.editedTodo && todoState.editedTodo.id === todo.id) {
      todoDispatch({ type: "set-edited-todo", payload: null });
      todoDispatch({ type: "set-todo-form", payload: { title: "", body: "" } });
    } else {
      todoDispatch({ type: "set-edited-todo", payload: todo });
      todoDispatch({
        type: "set-todo-form",
        payload: { title: todo.title, body: todo.body },
      });
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
      todoDispatch({ type: "get-todos", payload: res.data });
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
      // const res = await api.get("/todos");
      // todoDispatch({ type: "get-todos", payload: res.data });
      // To use reducer CRUD:
      todoDispatch({ type: "delete-todo", payload: todo.id });
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
