import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../types/root-state';

const searchState = (state: RootState) => state.search;

export const getLoading = createSelector(searchState, (search) => search.loading);
export const getError = createSelector(searchState, (search) => search.error);
export const getImages = createSelector(searchState, (search) => search.images);
