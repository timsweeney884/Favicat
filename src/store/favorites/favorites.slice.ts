import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Favorite } from '../../types/favorite';
import {
  fetchFavorites,
  favoriteImage,
  deleteFavorite,
} from './favorites.thunk';

export interface FavoriteState {
  loading: boolean;
  error: boolean;
  favorites: Favorite[];
}

const initialState: FavoriteState = {
  loading: false,
  error: false,
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(fetchFavorites.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(
      fetchFavorites.fulfilled,
      (state, action: PayloadAction<Favorite[]>) => {
        state.loading = false;
        state.favorites = action.payload;
      }
    );
    builder.addCase(favoriteImage.pending, (state) => {
      state.error = false;
    });
    builder.addCase(favoriteImage.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(
      favoriteImage.fulfilled,
      (state, action: PayloadAction<Favorite>) => {
        state.favorites.push(action.payload);
      }
    );
    builder.addCase(deleteFavorite.pending, (state) => {
      state.error = false;
    });
    builder.addCase(deleteFavorite.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(
      deleteFavorite.fulfilled,
      (state, action: PayloadAction<Pick<Favorite, 'favoriteId'>>) => {
        const index = state.favorites.findIndex(
          (favorite) => favorite.favoriteId === action.payload.favoriteId
        );

        if (index !== -1) {
          state.favorites.splice(index, 1);
        }
      }
    );
  },
});

export const { reducer: favoriteReducer } = favoriteSlice;
