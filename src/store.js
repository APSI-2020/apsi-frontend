import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { dataReducer } from './reducers';

const rootReducer = combineReducers({
  dataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
