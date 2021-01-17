import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { signIn, signInWithSso, signUp } from '../../api';
import { userData } from '../userReducer';

export const userLoggedIn = createAction('auth/userLoggedIn');

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const response = await signIn(values);
      sessionStorage.setItem('token', response.data.access);
      dispatch(userData());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginUserWithSSO = createAsyncThunk(
  'sso/login',
  async (parsed, { rejectWithValue, dispatch }) => {
    try {
      const response = await signInWithSso(parsed);
      sessionStorage.setItem('token', response.data.access);
      dispatch(userData());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      await signUp(values);
      dispatch(loginUser(values));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const signOut = createAction('auth/signOut');

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isUserLoggedIn: false,
    token: sessionStorage.getItem('token'),
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [userLoggedIn]: (state) => {
      state.isUserLoggedIn = true;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isUserLoggedIn = true;
      state.token = action.payload.access;
      state.loading = false;
    },
    [loginUser.rejected]: (state) => {
      state.loading = false;
    },
    [loginUserWithSSO.pending]: (state) => {
      state.loading = true;
    },
    [loginUserWithSSO.fulfilled]: (state, action) => {
      state.isUserLoggedIn = true;
      state.token = action.payload.access;
      state.loading = false;
    },
    [loginUserWithSSO.rejected]: (state) => {
      state.loading = false;
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.rejected]: (state) => {
      state.loading = false;
    },
    [signOut]: (state) => {
      state.isUserLoggedIn = false;
      state.token = null;
      sessionStorage.removeItem('token');
    },
  },
});
