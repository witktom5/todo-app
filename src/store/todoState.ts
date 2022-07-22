import { State } from "./types";

export const InitialTodoState: State = {
  todos: [],
  editedTodo: null,
  todoForm: { title: "", body: "" },
};
