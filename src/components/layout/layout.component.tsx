import { Header } from '../header/header.component';

export const Layout: React.FC = ({ children }) => (
  <>
    <Header />

    <main>{children}</main>
  </>
);
