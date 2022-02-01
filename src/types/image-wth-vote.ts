import { Image } from './image';

export interface ImageWithVote extends Image {
  voteCount: number;
}
