import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeApiRequest } from '../../services/api.service';
import { ApiVote } from '../../types/api/api-vote';
import { ApiVoteSubmit } from '../../types/api/api-vote-submit';
import { Vote } from '../../types/vote';

export const voteImage = createAsyncThunk(
  'vote/voteImage',
  async ({ imgId, value }: Pick<Vote, 'imgId' | 'value'>) => {
    const body = JSON.stringify({
      image_id: imgId,
      value,
    });

    const response = await makeApiRequest({
      path: 'votes',
      method: 'POST',
      body,
    });

    const vote: ApiVoteSubmit = await response.json();

    return {
      voteId: vote.id,
      imgId,
      value,
    };
  }
);

export const fetchVotes = createAsyncThunk('vote/fetchVotes', async () => {
  const response = await makeApiRequest({
    path: 'votes',
    method: 'GET',
    searchParams: {
      limit: 1000,
    },
  });

  const votes: ApiVote[] = await response.json();

  return votes.map((vote) => ({
    voteId: vote.id,
    imgId: vote['image_id'],
    value: vote.value,
  }));
});
