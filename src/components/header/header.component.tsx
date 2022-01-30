import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from '../../constants/app-routes.constants';

export const Header: React.FC = () => (
  <header>
    <nav>
      <ul>
        {Object.values(APP_ROUTES).map(({ path, title }) => (
          <li>
            <NavLink to={path}>{title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);
