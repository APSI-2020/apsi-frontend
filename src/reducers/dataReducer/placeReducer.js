import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPlaces, getLecturers } from '../../api';

const fetchPlaces = createAsyncThunk('places/fetchAll', async ({}, thunkApi) => {
  let places = await getPlaces();
  return places.data;
});

export const fetchLectureres = createAsyncThunk(
  'places/lecturers',
  async ({}, thunkApi) => {
    let lecturers = await getLecturers();
    return lecturers.data;
  },
);

export const fetchAllLectureres = () => {
  return fetchLectureres({});
};

export const fetchAllPlaces = () => {
  return fetchPlaces({});
};

export const placesSlice = createSlice({
  name: 'places',
  initialState: {
    places: [],
    place: null,
    lecturers: [],
  },
  reducers: {},
  extraReducers: {
    [fetchLectureres.fulfilled]: (state, action) => {
      state.lecturers = action.payload;
    },
    [fetchPlaces.fulfilled]: (state, action) => {
      state.places = action.payload;
    },
  },
});
