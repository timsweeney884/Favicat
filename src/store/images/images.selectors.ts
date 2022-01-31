import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../types/root-state';

const imageState = (state: RootState) => state.images;

export const getLoading = createSelector(
  imageState,
  (images) => images.loading
);

export const getError = createSelector(imageState, (images) => images.error);

export const getPublicImages = createSelector(
  imageState,
  (images) => images.publicImages
);

export const getUploadedImages = createSelector(
  imageState,
  (images) => images.uploadedImages
);
