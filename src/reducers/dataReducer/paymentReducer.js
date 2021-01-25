import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPaymentUrl, makePaymentApi, getPayments } from '../../api/payments';

export const payForEvent = createAsyncThunk('event/payment', async (eventId) => {
  return await getPaymentUrl(eventId);
});

export const makePayment = createAsyncThunk('payment', async (eventId) => {
  return await makePaymentApi(eventId);
});

// prettier-ignore
export const fetchPayments = createAsyncThunk('payments/fetchAll', async ({}, thunkApi) => {
    let payments = await getPayments();
    return payments.data;
  },
);

export const fetchAllPayments = () => {
  return fetchPayments();
};

export const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    payments: [],
    eventId: undefined,
    price: 0,
  },
  reducers: {},
  extraReducers: {
    [fetchPayments.fulfilled]: (state, action) => {
      state.payments.push(action.payload);
    },
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
