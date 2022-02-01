import { createSelector } from '@reduxjs/toolkit';
import { ImageWithVote } from '../../types/image-wth-vote';
import { RootState } from '../../types/root-state';
import { getVotes } from '../vote/vote.selectors';

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
  getVotes,
  (images) => images.uploadedImages
);

export const getUploadedImagesWithVotes = createSelector(
  getUploadedImages,
  getVotes,
  (images, votes): ImageWithVote[] => {
    return images.map((image) => {
      const voteCount = votes
        .filter((vote) => image.id === vote.imgId)
        .reduce(
          (voteCount, vote) =>
            vote.value === 1 ? voteCount + 1 : voteCount - 1,
          0
        );

      return {
        ...image,
        voteCount,
      };
    });
  }
);
