import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getEvents, getEvent, createEvent } from '../../api';

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

export const putEvent = createAsyncThunk(
  'events/create',
  async (values, { rejectWithValue }) => {
    try {
      console.log('4444');
      console.log(values);
      console.log('4444');
      const response = await createEvent(values);
      console.log('-----');
      console.log(response);
      console.log('-----');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

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
