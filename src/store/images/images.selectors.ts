import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../types/root-state';
import { getFavorites } from '../favorites/favorites.selectors';
import { getVotes } from '../vote/vote.selectors';
import { ImageWithVoteandFavorite } from '../../types/image-wth-vote-and-favorite';

const imageState = (state: RootState) => state.images;

export const getLoading = createSelector(
  imageState,
  (images) => images.loading
);

export const getError = createSelector(imageState, (images) => images.error);

export const getImages = createSelector(imageState, (images) => images.images);

export const getUploadedImagesWithVotesAndFavorites = createSelector(
  getImages,
  getVotes,
  getFavorites,
  (images, votes, favorites): ImageWithVoteandFavorite[] => {
    return images.map((image) => {
      const voteCount = votes
        .filter((vote) => image.id === vote.imgId)
        .reduce(
          (voteCount, vote) =>
            vote.value === 1 ? voteCount + 1 : voteCount - 1,
          0
        );

      const favoriteId = favorites.find(
        (favorite) => favorite.imgId === image.id
      )?.favoriteId;

      return {
        ...image,
        voteCount,
        favoriteId,
      };
    });
  }
);
