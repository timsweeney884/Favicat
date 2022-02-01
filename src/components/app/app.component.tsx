import { useEffect } from 'react';
import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom';
import { APP_ROUTES } from '../../constants/app-routes.constants';
import { Home } from '../../pages/home/home.component';
import { Upload } from '../../pages/upload/upload.component';
import { setSubId } from '../../utils/set-sub-id';
import { Layout } from '../layout/layout.component';

import './app.module.css';

export const App = () => {
  useEffect(() => {
    setSubId();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={APP_ROUTES.HOME.path} element={<Home />} />

          <Route path={APP_ROUTES.UPLOAD.path} element={<Upload />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
