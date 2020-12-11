import { createAction, createReducer } from '@reduxjs/toolkit';

const state = {
  isUserLoggedIn: false,
  token: undefined,
};

export const userLoggedIn = createAction('auth/userLoggedIn');

export const authReducer = createReducer(state, {
  [userLoggedIn]: (state, action) => {
    state.isUserLoggedIn = true;
    state.token = action.payload;
  },
});
