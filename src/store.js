import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { dataReducer, authReducer } from './reducers';

const rootReducer = combineReducers({
  dataReducer,
  authDb: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
