import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getEvents, getEvent } from '../../api';

const fetchEvents = createAsyncThunk('events/fetchAll', async ({}, thunkApi) => {
  let events = await getEvents();
  return events.data;
});

const fetchEvent = createAsyncThunk(
  'events/fetchOne',
  async ({ eventId }, thunkApi) => {
    let event = await getEvent(eventId);
    return event.data;
  },
);

export const fetchAllEvents = () => {
  return fetchEvents({});
};

export const fetchOneEvent = (eventId) => {
  return fetchEvent({
    eventId,
  });
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    event: null,
  },
  reducers: {},
  extraReducers: {
    [fetchEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
    },
    [fetchEvent.fulfilled]: (state, action) => {
      state.event = action.payload;
    },
  },
});
