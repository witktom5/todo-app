import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import todoReducer from '../features/todos/todoSlice';

import { todoApi } from '../services/todos';

import { rtkQueryErrorLogger } from './middleware/errorMiddleware';

const rootReducer = combineReducers({
  todoReducer,
  authReducer,
  [todoApi.reducerPath]: todoApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todoApi.middleware, rtkQueryErrorLogger),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
