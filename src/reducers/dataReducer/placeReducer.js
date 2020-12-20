import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPlaces } from '../../api';

const fetchPlaces = createAsyncThunk('places/fetchAll', async ({}, thunkApi) => {
  let places = await getPlaces();
  return places.data;
});

export const fetchAllPlaces = () => {
  return fetchPlaces({});
};

export const placesSlice = createSlice({
  name: 'places',
  initialState: {
    places: [],
    place: null,
  },
  reducers: {},
  extraReducers: {
    [fetchPlaces.fulfilled]: (state, action) => {
      state.places = action.payload;
    },
  },
});
