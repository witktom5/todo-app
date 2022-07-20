import { useState, createContext } from "react";

import { TodosContextProps } from "../types/todoContext";
import TodoI from "../types/todo";

const TodosContext: any = createContext(null);

export const TodoContextProvider = ({ children }: TodosContextProps) => {
  const [todos, setTodos] = useState<TodoI[] | null>(null);
  const [title, setTitle] = useState<string | null>("");
  const [body, setBody] = useState<string | null>("");
  const [editedTodo, setEditedTodo] = useState<TodoI | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  return (
    <TodosContext.Provider
      value={{
        title,
        setTitle,
        body,
        setBody,
        editedTodo,
        setEditedTodo,
        todos,
        setTodos,
        isLoading,
        setIsLoading,
        errorMsg,
        setErrorMsg,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
