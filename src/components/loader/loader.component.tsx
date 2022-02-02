import cx from 'classnames';
import styles from './loader.module.css';

interface LoaderProps {
  small?: boolean;
}

export const Loader = ({ small }: LoaderProps) => (
  <span className={styles.loaderContainer}>
    {[styles.loaderDotOne, styles.loaderDotTwo, styles.loaderDotThree].map(
      (dotClass) => (
        <span
          key={dotClass}
          className={cx(styles.loaderDot, dotClass, {
            [styles.loaderDotSmall]: small,
          })}
        ></span>
      )
    )}
  </span>
);
