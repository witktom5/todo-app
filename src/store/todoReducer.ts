import { TodoAction, State } from "./types";

export function todoReducer(state: State, action: TodoAction): State {
  switch (action.type) {
    case "delete-todo":
      return {
        ...state,
        todos: state.todos.filter((el) => el.id !== action.payload),
      };
    case "update-todo":
      return {
        ...state,
        todos: state.todos.map((el) =>
          el.id === action.payload.id ? action.payload : el
        ),
      };
    case "create-todo":
      return { ...state, todos: [...state.todos, action.payload] };
    case "get-todos":
      return { ...state, todos: action.payload };
    case "set-edited-todo":
      return { ...state, editedTodo: action.payload };
    case "set-todo-form":
      return { ...state, todoForm: action.payload };
    default:
      return state;
  }
}
