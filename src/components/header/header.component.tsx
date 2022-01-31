import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from '../../constants/app-routes.constants';
import styles from './header.module.css';

export const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.headerContent}>
      <div className={styles.logoColumn}>
        <h1 className={styles.logoHeading}>
          <NavLink className={styles.logoLink} to={APP_ROUTES.HOME.path}>
            FaviCat
          </NavLink>
        </h1>
      </div>
      <div className={styles.navColumn}>
        <nav>
          <ul className={styles.list}>
            {Object.values(APP_ROUTES).map(({ path, title }) => (
              <li className={styles.listItem}>
                <NavLink className={styles.navLink} to={path}>
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  </header>
);
