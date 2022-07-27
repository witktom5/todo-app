import { TodoCardProps } from "../../types/todoCard";
import styles from "./TodoCard.module.css";

import { useNavigate } from "react-router-dom";

import ConditionalLink from "../../shared/ConditionalLink";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateFormData, setEditedTodo } from "../../store/reducers/todoSlice";
import { updateTodo, deleteTodo } from "../../store/asyncActions/todos";

function TodoCard({ todo, isSelected }: TodoCardProps) {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todoReducer);
  const authState = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  // ON EDIT TODO BTN

  const onEdit = () => {
    if (todoState.editedTodo && todoState.editedTodo.id === todo.id) {
      dispatch(setEditedTodo(null));
      dispatch(updateFormData({ title: "", body: "" }));
    } else {
      dispatch(setEditedTodo(todo));
      dispatch(updateFormData({ title: todo.title, body: todo.body }));
    }
  };

  // ON COMPLETE TODO BTN

  const onComplete = async () => {
    dispatch(updateTodo({ ...todo, isComplete: !todo.isComplete }));
  };

  //  ON DELETE TODO BTN

  const onDelete = async () => {
    if (authState.currentUser && authState.currentUser.role === "admin") {
      dispatch(deleteTodo(todo));
      navigate("/todos");
    }
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
              {authState.currentUser && authState.currentUser.role === "admin" && (
                <button
                  onClick={onDelete}
                  className={`${styles["todo-btn"]} ${styles["btn-remove"]}`}
                >
                  X
                </button>
              )}
            </div>
          )}
        </div>
        <div className={styles["todo-text"]}>{todo.body}</div>
      </div>
    </ConditionalLink>
  );
}
export default TodoCard;
