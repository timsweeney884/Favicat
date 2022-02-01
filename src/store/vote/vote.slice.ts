import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vote } from '../../types/vote';
import { fetchVotes, voteImage } from './vote.thunk';

export interface VoteState {
  loading: boolean;
  error: boolean;
  votes: Vote[];
}

const initialState: VoteState = {
  loading: false,
  error: false,
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
    });
    builder.addCase(voteImage.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(
      voteImage.fulfilled,
      (state, action: PayloadAction<Vote>) => {
        state.votes.push(action.payload);
      }
    );
  },
});

export const { reducer: voteReducer } = voteSlice;
