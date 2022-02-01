import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { favoriteReducer } from './favorites/favorites.slice';
import { imagesReducer } from './images/images.slice';
import { uploadReducer } from './upload/upload.slice';
import { voteReducer } from './vote/vote.slice';

export const store = configureStore({
  reducer: combineReducers({
    images: imagesReducer,
    upload: uploadReducer,
    vote: voteReducer,
    favorites: favoriteReducer,
  }),
});
