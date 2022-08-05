import { TodoStateI } from '../types';

export const initialTodoState: TodoStateI = {
  editedTodo: null,
  todoForm: { title: '', body: '' },
};
