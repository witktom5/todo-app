import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserI } from '../types';
import { initialAuthState as initialState } from './authState';
import { loginUser } from './authAsyncActions';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      localStorage.removeItem('token');
      state.currentUser = null;
    },
  },
  extraReducers: {
    [loginUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled.type]: (state, action: PayloadAction<UserI>) => {
      state.isLoading = false;
      state.error = '';
      state.currentUser = action.payload;
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
