import api from "../../shared/utils/api";
import { TodoI } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const response = await api.get<TodoI[]>("/todos");
      return response.data;
    } catch (e) {
      if (e instanceof Error || e instanceof AxiosError) {
        return thunkAPI.rejectWithValue(e.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occured");
      }
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (newTodo: TodoI, thunkAPI) => {
    try {
      const response = await api.post<TodoI>("/todos", newTodo);
      return response.data;
    } catch (e) {
      if (e instanceof Error || e instanceof AxiosError) {
        return thunkAPI.rejectWithValue(e.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occured");
      }
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo: TodoI, thunkAPI) => {
    try {
      await api.put<TodoI>(`/todos/${updatedTodo.id}`, updatedTodo);
      const allTodos = await api.get<TodoI[]>("/todos");
      return allTodos.data;
    } catch (e) {
      if (e instanceof Error || e instanceof AxiosError) {
        return thunkAPI.rejectWithValue(e.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occured");
      }
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todo: TodoI, thunkAPI) => {
    try {
      await api.delete<TodoI>(`/todos/${todo.id}`);
      const allTodos = await api.get<TodoI[]>("/todos");
      return allTodos.data;
    } catch (e) {
      if (e instanceof Error || e instanceof AxiosError) {
        return thunkAPI.rejectWithValue(e.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occured");
      }
    }
  }
);
