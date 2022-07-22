import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AxiosError } from "axios";

import TodoInput from "../TodoInput/TodoInput";
import TodoFormContext from "../../context/todos";
import styles from "./TodoForm.module.css";

import api from "../../shared/utils/api";
import TodoI from "../../types/todo";

function TodoForm() {
  const { todoDispatch, todoState, setIsLoading, setErrorMsg } =
    useContext(TodoFormContext);

  const params = useParams();

  const config = [
    {
      placeholder: "Enter Todo title",
      propName: "todoTitle",
    },
    {
      placeholder: "Enter Todo text",
      propName: "todoText",
    },
  ];

  const clearFormData = () => {
    todoDispatch({ type: "set-todo-form", payload: { title: "", body: "" } });
  };

  // ADD TODO

  const onSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: TodoI = {
      ...todoState.todoForm,
      isComplete: false,
      createDate: new Date(Date.now()),
    };
    try {
      setIsLoading(true);
      const res = await api.post("/todos", newTodo);
      todoDispatch({ type: "create-todo", payload: res.data });
      clearFormData();
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Something went wrong...");
      }
    }
    setIsLoading(false);
  };

  //  EDIT TODO

  const onSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await api.put(`/todos/${todoState.editedTodo.id}`, {
        ...todoState.editedTodo,
        ...todoState.todoForm,
      });
      todoDispatch({
        type: "update-todo",
        payload: res.data,
      });
      todoDispatch({ type: "set-edited-todo", payload: null });
      clearFormData();
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Something went wrong...");
      }
    }
    setIsLoading(false);
  };

  // don't show form until edit btn if it's an todos/:id route
  return !params.todoId || todoState.editedTodo ? (
    <section className={styles["add-todo-container"]}>
      <form
        className={styles["add-todo-form"]}
        onSubmit={todoState.editedTodo ? onSubmitEdit : onSubmitAdd}
      >
        {config.map((el, i) => (
          <TodoInput
            key={i}
            placeholder={el.placeholder}
            propName={el.propName}
          />
        ))}
        <button type="submit" className={styles["btn-add"]}>
          {todoState.editedTodo ? "Save Todo" : "Create Todo"}
        </button>
      </form>
    </section>
  ) : (
    <></>
  );
}
export default TodoForm;
