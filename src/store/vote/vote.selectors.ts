import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../types/root-state';

const voteState = (state: RootState) => state.vote;

export const getLoading = createSelector(voteState, (votes) => votes.loading);

export const getError = createSelector(voteState, (votes) => votes.error);

export const getVotes = createSelector(voteState, (votes) => votes.votes);

export const getVoteIsSubmitting = createSelector(
  voteState,
  (votes) => votes.submittingVote
);

export const getVoteIsDeleting = createSelector(
  voteState,
  (votes) => votes.deletingVote
);
