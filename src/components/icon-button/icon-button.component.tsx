import { MouseEvent } from 'react';
import cx from 'classnames';
import styles from './icon-button.module.css';
import { IconType } from 'react-icons';

interface IconButtonProps {
  onClick: () => void;
  Icon: IconType;
  isActive?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  isActive,
  Icon,
}) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={cx(styles.button, {
        [styles.buttonActive]: isActive,
      })}
    >
      <Icon size={30} />
    </button>
  );
};
