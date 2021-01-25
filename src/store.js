import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  dataReducer,
  authSlice,
  eventsSlice,
  userSlice,
  paymentSlice,
  placesSlice,
} from './reducers';

const rootReducer = combineReducers({
  dataReducer,
  auth: authSlice.reducer,
  events: eventsSlice.reducer,
  places: placesSlice.reducer,
  user: userSlice.reducer,
  payments: paymentSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
