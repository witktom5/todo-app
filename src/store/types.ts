import TodoI from "../types/todo";

export interface State {
  todos: TodoI[];
  editedTodo: TodoI | null;
  todoForm: TodoForm;
}

type TodoForm = { title: string; body: string };

type deleteTodoAction = { type: "delete-todo"; payload: number | string };
type createTodoAction = { type: "create-todo"; payload: TodoI };
type updateTodoAction = { type: "update-todo"; payload: TodoI };
type getTodosAction = { type: "get-todos"; payload: TodoI[] };
type setEditedTodoAction = { type: "set-edited-todo"; payload: TodoI | null };
type setTodoFormAction = { type: "set-todo-form"; payload: TodoForm };

export type TodoAction =
  | deleteTodoAction
  | createTodoAction
  | updateTodoAction
  | getTodosAction
  | setEditedTodoAction
  | setTodoFormAction;
