import styles from './grid.module.css';

export const GridColumn: React.FC = ({ children }) => {
  return <div className={styles.gridColumn}>{children}</div>;
};
