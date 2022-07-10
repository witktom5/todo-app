import { useState } from "react";

import Header from "./components/Header";
import AddTodoForm from "./components/AddTodoForm";
import TodoContainer from "./components/TodoContainer";

function App() {
  //  Todos state
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  //  Todo form state
  const initialStateForm = { todoTitle: "", todoText: "" };
  const [todoFormData, setTodoFormData] = useState(initialStateForm);

  // Add todo
  const onAddTodo = (title, text) => {
    //  give 'unique' id for future reference
    const id = Date.now() + Math.random();
    setTodos([...todos, { title, text, id, completed: false }]);
  };

  // Edit todo
  const onEditTodo = (title, text) => {
    setTodos(
      todos.map((e) => {
        if (e.id === editedTodo) {
          e.title = title;
          e.text = text;
        }
        return e;
      })
    );
    setEditedTodo(null);
  };

  // Complete todo
  const onCompleteTodo = (todo) => {
    setTodos(
      todos.map((el) => {
        if (el.id === todo.id) el.completed = !el.completed;
        return el;
      })
    );
  };

  return (
    <main>
      <Header />
      <AddTodoForm
        editedTodo={editedTodo}
        onAddTodo={onAddTodo}
        todoFormData={todoFormData}
        initialStateForm={initialStateForm}
        setTodoFormData={setTodoFormData}
        onEditTodo={onEditTodo}
      />
      <TodoContainer
        editedTodo={editedTodo}
        todos={todos}
        setTodoFormData={setTodoFormData}
        setEditedTodo={setEditedTodo}
        onCompleteTodo={onCompleteTodo}
      />
    </main>
  );
}

export default App;
