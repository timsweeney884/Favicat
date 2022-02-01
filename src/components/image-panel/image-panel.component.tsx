import { VoteBar } from '../vote-bar/vote-bar.component';
import styles from './image-panel.module.css';

interface ImagePanelProps {
  imgSrc: string;
  voteCount: number;
  onVote?: (value: number) => void;
}

export const ImagePanel: React.FC<ImagePanelProps> = ({
  imgSrc,
  voteCount,
  onVote = () => {},
}: ImagePanelProps) => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${imgSrc})` }}
        className={styles.imagePanel}
      >
        <div className={styles.voteBarContainer}>
          <VoteBar onVote={onVote} voteCount={voteCount} />
        </div>
      </div>
    </>
  );
};
