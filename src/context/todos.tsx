import { useState, createContext, useReducer } from "react";

import { todoReducer } from "../store/todoReducer";
import { InitialTodoState } from "../store/todoState";

import { TodosContextProps } from "./types";

const TodosContext: any = createContext(null);

export const TodoContextProvider = ({ children }: TodosContextProps) => {
  const [todoState, todoDispatch] = useReducer(todoReducer, InitialTodoState);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  return (
    <TodosContext.Provider
      value={{
        todoState,
        todoDispatch,
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
