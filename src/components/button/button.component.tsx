import styles from './button.module.css';

interface ButtonProps {
  type: 'button' | 'submit';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
}) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
