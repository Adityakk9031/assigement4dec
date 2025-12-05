// Auth slice: manages current user and JWT token from localStorage.
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialToken = localStorage.getItem('token');
const initialUserRaw = localStorage.getItem('user');

const initialState: AuthState = {
  token: initialToken,
  user: initialUserRaw ? JSON.parse(initialUserRaw) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>,
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;





