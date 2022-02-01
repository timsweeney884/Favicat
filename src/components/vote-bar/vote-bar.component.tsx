import styles from './vote-bar.module.css';
import { MdFavorite, MdThumbDown, MdThumbUp } from 'react-icons/md';
import { IconButton } from '../icon-button/icon-button.component';
import { useState } from 'react';

interface VoteBarProps {
  voteCount: number;
  onVote: (value: number) => void;
}

export const VoteBar: React.FC<VoteBarProps> = ({ voteCount, onVote }) => {
  const [isUpvote, setIsUpvote] = useState(false);
  const [isDownvote, setIsDownVote] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const onUpVote = () => {
    setIsUpvote(!isUpvote);
    setIsDownVote(false);
    onVote(!isUpvote ? 1 : 0);
  };

  const onDownVote = () => {
    setIsDownVote(!isDownvote);
    setIsUpvote(false);
    onVote(!isDownvote ? 0 : 1);
  };

  const onFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.voteBar}>
      <div className={styles.voteColumn}>
        <IconButton onClick={onUpVote} Icon={MdThumbUp} />

        <p className={styles.voteCount}>{voteCount}</p>

        <IconButton onClick={onDownVote} Icon={MdThumbDown} />
      </div>

      <div className={styles.favoriteColumn}>
        <IconButton
          isActive={isFavorite}
          onClick={onFavorite}
          Icon={MdFavorite}
        />
      </div>
    </div>
  );
};
