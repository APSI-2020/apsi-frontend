import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { signIn } from '../../api';

export const userLoggedIn = createAction('auth/userLoggedIn');

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (values, { rejectWithValue }) => {
    try {
      const response = await signIn(values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

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
      sessionStorage.setItem('token', state.token);
    },
    [loginUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});
