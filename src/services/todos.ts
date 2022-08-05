import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TodoI } from '../features/types';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/',
  }),
  tagTypes: ['Todos'],
  endpoints: (build) => ({
    fetchAllTodos: build.query<TodoI[], void>({
      query: () => '/todos',
      providesTags: ['Todos'],
    }),
    addTodo: build.mutation<TodoI, TodoI>({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: build.mutation<TodoI, TodoI>({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: 'PUT',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: build.mutation<void, number>({
      query: (todoId) => ({
        url: `todos/${todoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useFetchAllTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
