import { useEffect, useContext } from "react";
import TodosContext from "../../context/todos";

import TodoI from "../../types/todo";
import { AxiosError } from "axios";

import { Outlet } from "react-router-dom";

import api from "../../shared/utils/api";
import styles from "./Todos.module.css";

import TodoForm from "../../components/TodoForm/TodoForm";
import TodoCard from "../../components/TodoCard/TodoCard";
import Spinner from "../../layout/Spinner";

function Todos() {
  const { todos, setTodos, isLoading, setIsLoading, errorMsg, setErrorMsg } =
    useContext(TodosContext);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/todos");
        setTodos(res.data);
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg("Something went wrong...");
        }
      }
      setIsLoading(false);
    };
    fetchTodos();
  }, [setTodos, setErrorMsg, setIsLoading]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Outlet></Outlet>
      {errorMsg && <p className={styles["error-message"]}>{errorMsg}</p>}
      <TodoForm />
      <section className={styles["todo-list-container"]}>
        {todos && todos.length > 0 ? (
          todos.map((el: TodoI, i: number) => (
            <TodoCard isSelected={false} key={i} todo={el} />
          ))
        ) : (
          <div className={styles["no-todos-text"]}>
            {!todos && "There are no Todos yet! Please add your first Todo."}
          </div>
        )}
      </section>
    </>
  );
}
export default Todos;
