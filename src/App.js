import { useState, useEffect } from "react";

import api from "./shared/utils/api";

import Header from "./components/Header";
import AddTodoForm from "./components/AddTodoForm";
import TodoContainer from "./components/TodoContainer";
import ErrorMessage from "./shared/components/ErrorMessage";

function App() {
  // Synchronize TODOs from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await api.get("/todos");
        setTodos(todos.data);
      } catch (error) {
        console.log(error);
        setErrorMsg(error.message);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  //  App state
  const [todos, setTodos] = useState([]);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true by default
  const [errorMsg, setErrorMsg] = useState("");

  //  Todo form state
  const initialStateForm = { todoTitle: "", todoText: "" };
  const [todoFormData, setTodoFormData] = useState(initialStateForm);

  // Add todo
  const onAddTodo = async (title, text) => {
    const todoToAdd = { title, text, completed: false };
    setIsLoading(true);
    try {
      const addedTodo = await api.post("/todos", todoToAdd);
      setTodos([...todos, addedTodo.data]);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
    setIsLoading(false);
  };

  // Edit todo (on save)
  const onEditTodo = async (title, text) => {
    try {
      setIsLoading(true);
      await api.put(`/todos/${todoToEdit.id}`, {
        ...todoToEdit,
        title,
        text,
      });
      setTodos(
        todos.map((e) => {
          if (e.id === todoToEdit.id) {
            e.title = title;
            e.text = text;
          }
          return e;
        })
      );
      setTodoToEdit(null);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
    setIsLoading(false);
  };

  // Complete todo
  const onCompleteTodo = async (todo) => {
    try {
      setIsLoading(true);
      await api.put(`/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(
        todos.map((el) => {
          if (el.id === todo.id) el.completed = !el.completed;
          return el;
        })
      );
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
    setIsLoading(false);
  };

  //  Remove todo
  const onRemoveTodo = async (todo) => {
    try {
      setIsLoading(true);
      await api.delete(`/todos/${todo.id}`);
      setTodos(todos.filter((el) => el.id !== todo.id));
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
    setIsLoading(false);
  };

  return (
    <main>
      <Header />
      {errorMsg && <ErrorMessage message={errorMsg} />}
      <AddTodoForm
        todoToEdit={todoToEdit}
        onAddTodo={onAddTodo}
        todoFormData={todoFormData}
        initialStateForm={initialStateForm}
        setTodoFormData={setTodoFormData}
        onEditTodo={onEditTodo}
      />
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <TodoContainer
          todoToEdit={todoToEdit}
          todos={todos}
          setTodoFormData={setTodoFormData}
          setTodoToEdit={setTodoToEdit}
          onCompleteTodo={onCompleteTodo}
          onRemoveTodo={onRemoveTodo}
        />
      )}
    </main>
  );
}

export default App;
