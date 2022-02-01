import styles from './vote-bar.module.css';
import { MdFavorite, MdThumbDown, MdThumbUp } from 'react-icons/md';
import { IconButton } from '../icon-button/icon-button.component';
import { useState } from 'react';

interface VoteBarProps {
  voteCount: number;
  isCurrentFavorite: boolean;
  onVote: (value: number) => void;
  onFavorite: () => void;
  onUnfavorite: () => void;
}

export const VoteBar: React.FC<VoteBarProps> = ({
  voteCount,
  onVote,
  isCurrentFavorite,
  onFavorite,
  onUnfavorite,
}) => {
  const [isUpvote, setIsUpvote] = useState(false);
  const [isDownvote, setIsDownVote] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isCurrentFavorite);

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

  const onSetFavorite = () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      onFavorite();
    } else {
      onUnfavorite();
    }
  };

  return (
    <div className={styles.voteBar}>
      <div className={styles.voteColumn}>
        <IconButton isActive={isUpvote} onClick={onUpVote} Icon={MdThumbUp} />

        <IconButton
          isActive={isDownvote}
          onClick={onDownVote}
          Icon={MdThumbDown}
        />

        <p className={styles.voteCount}>{voteCount}</p>
      </div>

      <div className={styles.favoriteColumn}>
        <IconButton
          isActive={isFavorite}
          onClick={onSetFavorite}
          Icon={MdFavorite}
        />
      </div>
    </div>
  );
};
