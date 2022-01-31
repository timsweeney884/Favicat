import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { imagesReducer } from './images/images.slice';
import { uploadReducer } from './upload/upload.slice';

export const store = configureStore({
  reducer: combineReducers({
    images: imagesReducer,
    upload: uploadReducer
  }),
});
