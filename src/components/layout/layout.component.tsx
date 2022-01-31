import { Header } from '../header/header.component';

import styles from './layout.module.css';

export const Layout: React.FC = ({ children }) => (
  <>
    <Header />

    <main className={styles.main}>{children}</main>
  </>
);
