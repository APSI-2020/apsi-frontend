import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { dataReducer, authSlice, eventsSlice } from './reducers';

const rootReducer = combineReducers({
  dataReducer,
  auth: authSlice.reducer,
  events: eventsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
