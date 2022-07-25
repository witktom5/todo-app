import TodoCard from "../../components/TodoCard/TodoCard";
import { useContext, useEffect, useState } from "react";
import TodosContext from "../../context/todos";
import { useParams, Link } from "react-router-dom";
import TodoI from "../../types/todo";

import styles from "./ViewTodo.module.css";

function ViewTodo() {
  const { todoId } = useParams();
  const { todoState, todoDispatch } = useContext(TodosContext);
  const [todo, setTodo] = useState<TodoI | null>(null);
  // If no Todo data (for example on refresh page)
  useEffect(() => {
    if (todoState.todos) {
      setTodo(todoState.todos.find((el: TodoI) => el.id === todoId));
      window.scrollTo(0, 0); // scroll to the top of the page
    }
    if (todoState.editedTodo !== todo) {
      todoDispatch({ type: "set-edited-todo", payload: null });
    }
  }, [todoState.todos, todoState.editedTodo, todoId, todo, todoDispatch]);

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
