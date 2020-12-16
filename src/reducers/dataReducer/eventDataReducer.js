import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getEvents } from '../../api';

const fetchEvents = createAsyncThunk('events/fetchAll', async ({}, { getState }) => {
  let state = getState();
  let events = await getEvents(state.auth.token);
  return events.data;
});

export const fetchAllEvents = () => {
  return fetchEvents({});
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
  },
  reducers: {},
  extraReducers: {
    [fetchEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
    },
  },
});
