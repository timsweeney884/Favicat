import { VoteBar } from '../vote-bar/vote-bar.component';
import styles from './image-panel.module.css';

interface ImagePanelProps {
  imgSrc: string;
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

export const ImagePanel: React.FC<ImagePanelProps> = ({
  imgSrc,
  voteCount,
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
  onVote = () => {},
}: ImagePanelProps) => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${imgSrc})` }}
        className={styles.imagePanel}
      >
        <div className={styles.voteBarContainer}>
          <VoteBar
            favoriteIsSubmitting={favoriteIsSubmitting}
            favoriteIsDeleting={favoriteIsDeleting}
            voteIsSubmitting={voteIsSubmitting}
            voteIsDeleting={voteIsDeleting}
            onDeleteVote={onDeleteVote}
            isCurrentUpVote={isCurrentUpVote}
            isCurrentDownVote={isCurrentDownVote}
            isCurrentFavorite={isCurrentFavorite}
            onUnfavorite={onUnfavorite}
            onFavorite={onFavorite}
            onVote={onVote}
            voteCount={voteCount}
          />
        </div>
      </div>
    </>
  );
};
