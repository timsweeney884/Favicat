import { MouseEvent } from 'react';
import cx from 'classnames';
import { IconType } from 'react-icons';
import styles from './icon-button.module.css';

interface IconButtonProps {
  onClick: () => void;
  Icon: IconType;
  disabled?: boolean;
  isActive?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  isActive,
  Icon,
  disabled,
}) => {
  const handleClick = (e: MouseEvent) => {
    if (!disabled) {
      e.preventDefault();
      onClick();
    }
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
