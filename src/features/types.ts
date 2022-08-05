export interface State {
  todos: TodoI[];
  editedTodo: TodoI | null;
  todoForm: TodoFormT;
}

export type UserI = {
  name: string;
  id: number | string;
  role: string;
};

export interface TodoI {
  title: string;
  body: string;
  isComplete: boolean;
  createDate: Date;
  completeDate?: Date;
  id?: string | number;
}

export interface AuthStateI {
  currentUser: UserI | null;
  isLoading: boolean;
  error: string;
}

export type TodoFormT = { title: string; body: string };

export interface TodoStateI {
  editedTodo: TodoI | null;
  todoForm: TodoFormT;
}
