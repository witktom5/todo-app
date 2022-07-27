import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoI } from "../types";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../asyncActions/todos";
import { initialTodoState as initialState } from "../state";
import { TodoFormT } from "../state";

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<TodoFormT>) {
      state.todoForm = action.payload;
    },
    setEditedTodo(state, action: PayloadAction<TodoI | null>) {
      state.editedTodo = action.payload;
    },
  },
  extraReducers: {
    [fetchTodos.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchTodos.fulfilled.type]: (state, action: PayloadAction<TodoI[]>) => {
      state.isLoading = false;
      state.error = "";
      state.todos = action.payload;
    },
    [fetchTodos.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addTodo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addTodo.fulfilled.type]: (state, action: PayloadAction<TodoI>) => {
      state.isLoading = false;
      state.error = "";
      state.todos = state.todos.concat(action.payload);
    },
    [addTodo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateTodo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateTodo.fulfilled.type]: (state, action: PayloadAction<TodoI[]>) => {
      state.isLoading = false;
      state.error = "";
      state.todos = action.payload;
    },
    [updateTodo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteTodo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteTodo.fulfilled.type]: (state, action: PayloadAction<TodoI[]>) => {
      state.isLoading = false;
      state.error = "";
      state.todos = action.payload;
    },
    [deleteTodo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { updateFormData, setEditedTodo } = todoSlice.actions;
export default todoSlice.reducer;
