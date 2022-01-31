import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../types/root-state';

const uploadState = (state: RootState) => state.upload;

export const getLoading = createSelector(
  uploadState,
  (upload) => upload.loading
);
