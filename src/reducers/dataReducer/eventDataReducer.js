import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const mockEvents = () => {
  return new Promise((resolve, reject) => {
    let data = [];

    for (let i = 0; i < 5; ++i) {
      data.push({
        id: i,
        name: `Wydarzenie ${i}`,
        start: '2017-10-14T22:11:20+0000',
        end: '2017-10-14T22:11:20+0000',
        limitOfParticipants: 10,
        price: 99.99,
        place: 'Library',
        lecturers: [
          {
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            title: '',
          },
        ],
        amountOfParticipants: 10,
        tags: ['Tag 1', 'Tag 2'],
      });
    }

    resolve({
      data: data,
    });
  });
};

const fetchEvents = createAsyncThunk('events/fetchAll', async ({}, thunkApi) => {
  const response = await mockEvents();
  return response.data;
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
