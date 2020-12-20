import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { dataReducer, authSlice, eventsSlice } from './reducers';
import { placesSlice } from './reducers/dataReducer/placeReducer';

const rootReducer = combineReducers({
  dataReducer,
  auth: authSlice.reducer,
  events: eventsSlice.reducer,
  places: placesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
