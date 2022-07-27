import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { fetchTodos } from "../../store/asyncActions/todos";
import { TodoI } from "../../store/types";

import { Outlet, useNavigate } from "react-router-dom";

import styles from "./Todos.module.css";

import TodoForm from "../../components/TodoForm/TodoForm";
import TodoCard from "../../components/TodoCard/TodoCard";
import Spinner from "../../layout/Spinner";

function Todos() {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todoReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    dispatch(fetchTodos());
  }, [navigate, dispatch]);

  return todoState.isLoading ? (
    <Spinner />
  ) : (
    <>
      <Outlet></Outlet>
      {todoState.error && (
        <p className={styles["error-message"]}>{todoState.error}</p>
      )}
      <TodoForm />
      <section className={styles["todo-list-container"]}>
        {todoState.todos && todoState.todos.length > 0 ? (
          todoState.todos.map((el: TodoI, i: number) => (
            <TodoCard isSelected={false} key={i} todo={el} />
          ))
        ) : (
          <div className={styles["no-todos-text"]}>
            {!todoState.todos &&
              "There are no Todos yet! Please add your first Todo."}
          </div>
        )}
      </section>
    </>
  );
}
export default Todos;
