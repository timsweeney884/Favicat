import { VoteBar } from '../vote-bar/vote-bar.component';
import styles from './image-panel.module.css';

interface ImagePanelProps {
  imgSrc: string;
  voteCount: number;
  isCurrentFavorite: boolean;
  onVote: (value: number) => void;
  onFavorite: () => void;
  onUnfavorite: () => void;
}

export const ImagePanel: React.FC<ImagePanelProps> = ({
  imgSrc,
  voteCount,
  isCurrentFavorite,
  onFavorite,
  onUnfavorite,
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
