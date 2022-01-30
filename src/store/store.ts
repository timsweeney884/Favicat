import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { searchReducer } from './search/search.slice';

export const store = configureStore({
  reducer: combineReducers({
    search: searchReducer,
  }),
});
