import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../types/root-state';

const favoritesState = (state: RootState) => state.favorites;

export const getLoading = createSelector(
  favoritesState,
  (favorites) => favorites.loading
);

export const getError = createSelector(
  favoritesState,
  (favorites) => favorites.error
);

export const getFavorites = createSelector(
  favoritesState,
  (favorites) => favorites.favorites
);
