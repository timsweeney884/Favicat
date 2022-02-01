import { Image } from './image';

export interface ImageWithVoteandFavorite extends Image {
  voteCount: number;
  favoriteId?: number;
}
