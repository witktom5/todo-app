import { UserI, TodoI } from "./types";

export interface AuthState {
  currentUser: UserI | null;
  isLoading: boolean;
  error: string;
}

export const initialAuthState: AuthState = {
  currentUser: null,
  isLoading: false,
  error: "",
};

interface TodoState {
  todos: TodoI[];
  isLoading: boolean;
  error: string;
  editedTodo: TodoI | null;
  todoForm: TodoFormT;
}

export type TodoFormT = { title: string; body: string };

export const initialTodoState: TodoState = {
  todos: [],
  isLoading: false,
  error: "",
  editedTodo: null,
  todoForm: { title: "", body: "" },
};
