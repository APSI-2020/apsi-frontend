import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPlaces, getLecturers } from '../../api';

const fetchPlaces = createAsyncThunk('places/fetchAll', async ({}, thunkApi) => {
  let places = await getPlaces();
  return places.data;
});

const fetchLectureres = createAsyncThunk(
  'places/lecturers',
  async ({}, thunkApi) => {
    let lecturers = await getLecturers();
    console.log(lecturers);
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
    [fetchAllLectureres.fulfilled]: (state, action) => {
      console.log(action);
      console.log('action');
      state.lecturers = action.payload;
    },
    [fetchPlaces.fulfilled]: (state, action) => {
      console.log('reducer');
      state.places = action.payload;
    },
  },
});
