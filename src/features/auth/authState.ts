import { AuthStateI } from '../types';

export const initialAuthState: AuthStateI = {
  currentUser: null,
  isLoading: false,
  error: '',
};
