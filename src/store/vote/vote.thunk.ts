import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeApiRequest } from '../../services/api.service';
import { ApiVote } from '../../types/api/api-vote';
import { ApiVoteSubmit } from '../../types/api/api-vote-submit';
import { RootState } from '../../types/root-state';
import { Vote } from '../../types/vote';
import { VoteToDelete } from '../../types/vote-to-delete';
import { getSubId } from '../../utils/get-sub-id';

export const voteImage = createAsyncThunk(
  'vote/voteImage',
  async ({ imgId, value }: Pick<Vote, 'imgId' | 'value'>) => {
    const body = JSON.stringify({
      image_id: imgId,
      sub_id: getSubId(),
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
      current: true,
    };
  }
);

export const fetchVotes = createAsyncThunk('vote/fetchVotes', async () => {
  const response = await makeApiRequest({
    path: 'votes',
    method: 'GET',
    searchParams: {
      limit: 500,
    },
  });

  const votes: ApiVote[] = await response.json();

  return votes.map((vote) => ({
    voteId: vote.id,
    imgId: vote.image_id,
    value: vote.value,
    subId: vote.sub_id,
    current: getSubId() === vote.sub_id,
  }));
});

export const deleteVote = createAsyncThunk<
  Partial<Pick<Vote, 'voteId'>>,
  VoteToDelete,
  {
    state: RootState;
  }
>('vote/deleteVote', async (voteToDelete, { getState }) => {
  const voteId = getState()
    .vote.votes.filter((vote) => vote.current)
    .find(
      (vote) =>
        voteToDelete.imgId === vote.imgId &&
        voteToDelete.voteValue === vote.value
    )?.voteId;

  const response = await makeApiRequest({
    path: `votes/${voteId}`,
    method: 'DELETE',
  });

  await response.json();

  return {
    voteId: voteId,
  };
});
