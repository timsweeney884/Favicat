import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vote } from '../../types/vote';
import { deleteVote, fetchVotes, voteImage } from './vote.thunk';

export interface VoteState {
  loading: boolean;
  submittingVote: boolean;
  deletingVote: boolean;
  error: boolean;
  votes: Vote[];
}

const initialState: VoteState = {
  loading: false,
  error: false,
  submittingVote: false,
  deletingVote: false,
  votes: [],
};

export const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVotes.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(fetchVotes.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(
      fetchVotes.fulfilled,
      (state, action: PayloadAction<Vote[]>) => {
        state.loading = false;
        state.votes = action.payload;
      }
    );

    builder.addCase(voteImage.pending, (state) => {
      state.error = false;
      state.submittingVote = true;
    });
    builder.addCase(voteImage.rejected, (state) => {
      state.error = true;
      state.submittingVote = false;
    });
    builder.addCase(
      voteImage.fulfilled,
      (state, action: PayloadAction<Vote>) => {
        state.votes.push(action.payload);
        state.submittingVote = false;
      }
    );

    builder.addCase(deleteVote.pending, (state) => {
      state.error = false;
      state.deletingVote = true;
    });
    builder.addCase(deleteVote.rejected, (state) => {
      state.error = true;
      state.deletingVote = false;
    });
    builder.addCase(
      deleteVote.fulfilled,
      (state, action: PayloadAction<Partial<Pick<Vote, 'voteId'>>>) => {
        const index = state.votes.findIndex(
          (vote) => vote.voteId === action.payload.voteId
        );

        if (index !== -1) {
          state.votes.splice(index, 1);
        }

        state.deletingVote = false;
      }
    );
  },
});

export const { reducer: voteReducer } = voteSlice;
