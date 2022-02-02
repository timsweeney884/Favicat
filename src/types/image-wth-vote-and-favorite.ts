import { Image } from './image';

export interface ImageWithVoteandFavorite extends Image {
  voteCount: number;
  isUpvote: boolean;
  isDownVote: boolean;
  favoriteId?: number;
}
