import TodoCard from "../../components/TodoCard/TodoCard";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TodoI } from "../../store/types";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import styles from "./ViewTodo.module.css";
import { setEditedTodo } from "../../store/reducers/todoSlice";

function ViewTodo() {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todoReducer);
  const { todoId } = useParams();
  const [todo, setTodo] = useState<TodoI | null | undefined>(null);

  // If no Todo data (for example on refresh page)
  useEffect(() => {
    if (todoState.todos) {
      setTodo(todoState.todos.find((el: TodoI) => el.id === todoId));
      window.scrollTo(0, 0); // scroll to the top of the page
    }
    if (todoState.editedTodo !== todo) {
      dispatch(setEditedTodo(null));
    }
  }, [todoState.todos, todoState.editedTodo, todoId, todo, dispatch]);

  return (
    <>
      <div className={styles["link-container"]}>
        <Link className={styles.link} to="/todos">
          &#129044; Go back
        </Link>
      </div>
      <h3 className={styles.header}>Selected todo</h3>
      <div className={styles["todo-container"]}>
        {todo ? <TodoCard isSelected={true} todo={todo} /> : <></>}
      </div>
    </>
  );
}
export default ViewTodo;
