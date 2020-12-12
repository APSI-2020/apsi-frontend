import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { dataReducer, authReducer, eventsSlice } from './reducers';

const rootReducer = combineReducers({
  dataReducer,
  authDb: authReducer,
  events: eventsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
