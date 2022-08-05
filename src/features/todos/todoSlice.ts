import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoI } from '../types';
import { initialTodoState as initialState } from './todoState';
import { TodoFormT } from '../types';

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<TodoFormT>) {
      state.todoForm = action.payload;
    },
    setEditedTodo(state, action: PayloadAction<TodoI | null>) {
      state.editedTodo = action.payload;
    },
  },
  extraReducers: {},
});

export const { updateFormData, setEditedTodo } = todoSlice.actions;
export default todoSlice.reducer;
