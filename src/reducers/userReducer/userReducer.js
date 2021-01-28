import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserData } from '../../api';
import { signOut } from '../authReducer';

export const userData = createAsyncThunk(
  'user/userData',
  async (_, { dispatch }) => {
    try {
      const response = await getUserData();
      return response.data;
    } catch (e) {
      dispatch(signOut());
    }
  },
);

const lecturerGroupName = 'Lecturer';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loadingData: false,
    firstName: '',
    lastName: '',
    allowedTo: {
      addEvents: false,
    },
  },
  extraReducers: {
    [userData.pending]: (state) => {
      state.loadingData = true;
    },
    [userData.fulfilled]: (state, { payload }) => {
      state.loadingData = false;
      state.firstName = payload['first_name'];
      state.lastName = payload['last_name'];

      if (payload.groups.find((group) => group.name == lecturerGroupName))
        state.allowedTo.addEvents = true;
    },
    [userData.rejected]: (state) => {
      state.loadingData = false;
    },
  },
});
