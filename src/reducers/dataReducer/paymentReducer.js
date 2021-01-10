import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPaymentUrl, makePaymentApi } from '../../api/payments';

export const payForEvent = createAsyncThunk('event/payment', async (eventId) => {
  return await getPaymentUrl(eventId);
});

export const makePayment = createAsyncThunk('payment', async (eventId) => {
  return await makePaymentApi(eventId);
});

export const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    eventId: undefined,
    price: 0,
  },
  extraReducers: {
    [payForEvent.pending]: (state) => {
      state.eventId = undefined;
      state.price = undefined;
    },
    [payForEvent.fulfilled]: (state, action) => {
      state.eventId = action.payload.event_id;
      state.price = action.payload.price;
    },
    [makePayment.fulfilled]: (state) => {
      state.eventId = undefined;
      state.price = undefined;
    },
  },
});
