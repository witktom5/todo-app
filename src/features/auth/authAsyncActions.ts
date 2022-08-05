import { UserI } from '../types';
import { users } from '../../usersDB';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

//  Fake login with local storage and "user db" in a .ts file

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (name: string, thunkAPI) => {
    try {
      const response: UserI | undefined = await new Promise((resolve) =>
        setTimeout(() => {
          const user = users.find((el) => el.name === name);
          resolve(user);
        }, 1000)
      );
      if (response === undefined) throw new Error('User not found');
      localStorage.setItem('token', `${response.id}`);
      return response;
    } catch (e) {
      if (e instanceof Error || e instanceof AxiosError) {
        return thunkAPI.rejectWithValue(e.message);
      } else {
        return thunkAPI.rejectWithValue('Unknown error');
      }
    }
  }
);
