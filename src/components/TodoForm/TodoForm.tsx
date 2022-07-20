import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AxiosError } from "axios";

import TodoInput from "../TodoInput/TodoInput";
import TodoFormContext from "../../context/todos";
import styles from "./TodoForm.module.css";

import api from "../../shared/utils/api";
import TodoI from "../../types/todo";

function TodoForm() {
  const {
    editedTodo,
    setEditedTodo,
    title,
    setTitle,
    body,
    setBody,
    todos,
    setTodos,
    setIsLoading,
    setErrorMsg,
  } = useContext(TodoFormContext);

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
    setTitle("");
    setBody("");
  };

  // ADD TODO

  const onSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: TodoI = {
      title,
      body,
      isComplete: false,
      createDate: new Date(Date.now()),
    };
    try {
      setIsLoading(true);
      const res = await api.post("/todos", newTodo);
      setTodos([...todos, res.data]);
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
      await api.put(`/todos/${editedTodo.id}`, {
        ...editedTodo,
        title,
        body,
      });
      const allTodoRes = await api.get("/todos");
      setTodos(allTodoRes.data);
      setEditedTodo(null);
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
  return !params.todoId || editedTodo ? (
    <section className={styles["add-todo-container"]}>
      <form
        className={styles["add-todo-form"]}
        onSubmit={editedTodo ? onSubmitEdit : onSubmitAdd}
      >
        {config.map((el, i) => (
          <TodoInput
            key={i}
            placeholder={el.placeholder}
            propName={el.propName}
          />
        ))}
        <button type="submit" className={styles["btn-add"]}>
          {editedTodo ? "Save Todo" : "Create Todo"}
        </button>
      </form>
    </section>
  ) : (
    <></>
  );
}
export default TodoForm;
