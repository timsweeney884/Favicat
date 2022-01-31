import styles from './loader.module.css';
import cx from 'classnames';

export const Loader = () => (
  <div className={styles.loaderContainer}>
    <div>
      <span className={cx(styles.loaderDot, styles.loaderDotOne)}></span>
      <span className={cx(styles.loaderDot, styles.loaderDotTwo)}></span>
      <span className={cx(styles.loaderDot, styles.loaderDotThree)}></span>
    </div>
  </div>
);
