import styles from './error.module.css';

interface ErrorProps {
  heading: string;
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ heading, message }) => (
  <div className={styles.panel}>
    <h2 className={styles.heading}>{heading}</h2>
    <p className={styles.message}>{message}</p>
  </div>
);
