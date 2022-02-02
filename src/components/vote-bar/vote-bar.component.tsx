import { useEffect, useState } from 'react';
import { MdFavorite, MdThumbDown, MdThumbUp } from 'react-icons/md';
import styles from './vote-bar.module.css';
import { IconButton } from '../icon-button/icon-button.component';
import { Loader } from '../loader/loader.component';

interface VoteBarProps {
  voteCount: number;
  isCurrentFavorite: boolean;
  isCurrentUpVote: boolean;
  isCurrentDownVote: boolean;
  voteIsSubmitting: boolean;
  voteIsDeleting: boolean;
  favoriteIsSubmitting: boolean;
  favoriteIsDeleting: boolean;
  onVote: (value: number) => void;
  onDeleteVote: (value: number) => void;
  onFavorite: () => void;
  onUnfavorite: () => void;
}

interface VoteStatus {
  up: boolean;
  down: boolean;
}

export const VoteBar: React.FC<VoteBarProps> = ({
  voteCount,
  onVote,
  isCurrentFavorite,
  isCurrentUpVote,
  isCurrentDownVote,
  onFavorite,
  onUnfavorite,
  onDeleteVote,
  voteIsSubmitting,
  voteIsDeleting,
  favoriteIsSubmitting,
  favoriteIsDeleting,
}) => {
  const [disableVoting, setDisableVoting] = useState(false);
  const [disableFavoriting, setDisableFavoriting] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isCurrentFavorite);
  const [voteStatus, setVoteStatus] = useState<VoteStatus>({
    up: isCurrentUpVote,
    down: isCurrentDownVote,
  });

  const voteIsUpdating = voteIsDeleting || voteIsSubmitting;
  const favoriteIsUpdating = favoriteIsDeleting || favoriteIsSubmitting;

  const onHandleVote =
    ({
      otherVoteActive,
      otherVoteValue,
      newVoteStatus,
      currentVoteActive,
      currentVoteValue,
    }: {
      otherVoteActive: boolean;
      otherVoteValue: number;
      currentVoteActive: boolean;
      currentVoteValue: number;
      newVoteStatus: VoteStatus;
    }) =>
    () => {
      setDisableVoting(true);

      if (otherVoteActive) {
        onDeleteVote(otherVoteValue);
      }

      setVoteStatus(newVoteStatus);

      if (!currentVoteActive) {
        onVote(currentVoteValue);
      } else {
        onDeleteVote(currentVoteValue);
      }
    };

  const onSetFavorite = () => {
    setIsFavorite(!isFavorite);
    setDisableFavoriting(true);

    if (!isFavorite) {
      onFavorite();
    } else {
      onUnfavorite();
    }
  };

  useEffect(() => {
    if (!voteIsUpdating && disableVoting) {
      setDisableVoting(false);
    }
  }, [voteIsUpdating, disableVoting]);

  useEffect(() => {
    if (!favoriteIsUpdating && disableFavoriting) {
      setDisableFavoriting(false);
    }
  }, [favoriteIsUpdating, disableFavoriting]);

  return (
    <div className={styles.voteBar}>
      <div className={styles.voteColumn}>
        <IconButton
          disabled={disableVoting}
          isActive={voteStatus.up}
          onClick={onHandleVote({
            otherVoteActive: voteStatus.down,
            otherVoteValue: 0,
            newVoteStatus: {
              up: !voteStatus.up,
              down: false,
            },
            currentVoteActive: voteStatus.up,
            currentVoteValue: 1,
          })}
          Icon={MdThumbUp}
        />

        <IconButton
          disabled={disableVoting}
          isActive={voteStatus.down}
          onClick={onHandleVote({
            otherVoteActive: voteStatus.up,
            otherVoteValue: 1,
            newVoteStatus: {
              up: false,
              down: !voteStatus.down,
            },
            currentVoteActive: voteStatus.down,
            currentVoteValue: 0,
          })}
          Icon={MdThumbDown}
        />

        <p className={styles.voteCount}>
          {disableVoting ? <Loader small /> : voteCount}
        </p>
      </div>

      <div className={styles.favoriteColumn}>
        <IconButton
          disabled={disableFavoriting}
          isActive={isFavorite}
          onClick={onSetFavorite}
          Icon={MdFavorite}
        />
      </div>
    </div>
  );
};
