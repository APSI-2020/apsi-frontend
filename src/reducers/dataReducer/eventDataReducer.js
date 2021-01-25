import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getEvents, getEvent, createEvent, joinEvent, getQr } from '../../api';

const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async ({ filters }, thunkApi) => {
    let events = await getEvents(filters);
    return events.data;
  },
);

const fetchEvent = createAsyncThunk(
  'events/fetchOne',
  async ({ eventId }, thunkApi) => {
    let event = await getEvent(eventId);
    return event.data;
  },
);

const joinEventAction = createAsyncThunk(
  'events/join',
  async ({ eventId }, { dispatch }) => {
    let event = await joinEvent(eventId);
    dispatch(fetchEvent({ eventId }));
    return event.data;
  },
);

export const fetchAllEvents = (filters) => {
  return fetchEvents({ filters });
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
      const response = await createEvent(values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getQrCodeFull = createAsyncThunk(
  'events/qr',
  async ({ eventId }, thunkApi) => {
    let event = await getQr(eventId);
    return event.data;
  },
);

export const requestEventJoin = (eventId) => {
  return joinEventAction({
    eventId,
  });
};

export const getQrCode = (eventId) => {
  return getQrCodeFull({
    eventId,
  });
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    event: null,
    pdf: null,
  },
  reducers: {},
  extraReducers: {
    [getQrCode.fulfilled]: (state, action) => {
      console.log('reducer1!!!');
      state.pdf = action.payload;
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
    },
    [fetchEvent.fulfilled]: (state, action) => {
      state.event = action.payload;
    },
  },
});
