import styles from './image-panel.module.css';

interface ImagePanelProps {
  imgSrc: string;
}

export const ImagePanel: React.FC<ImagePanelProps> = ({
  imgSrc,
}: ImagePanelProps) => {
  return (
    <div
      style={{ backgroundImage: `url(${imgSrc})` }}
      className={styles.imagePanel}
    ></div>
  );
};
